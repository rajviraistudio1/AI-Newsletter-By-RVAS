/**
 * Newsletter Service
 * 
 * Centralized service for newsletter subscription handling and admin management.
 * Integrates directly with Supabase PostgreSQL database while
 * enforcing duplicate handling, client validation, and zero secret leakage.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const LOCAL_STORAGE_KEY = 'rajvir_newsletter_subscribers';

export const newsletterService = {
  /**
   * Validate an email address format.
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).trim().toLowerCase());
  },

  /**
   * Subscribe an email address to the newsletter.
   * @param {string} rawEmail 
   * @returns {Promise<{success: boolean, alreadySubscribed?: boolean, message: string, subscriber?: object}>}
   */
  async subscribe(rawEmail) {
    const email = String(rawEmail || '').trim().toLowerCase();

    // 1. Client-side input validation
    if (!email) {
      return {
        success: false,
        message: 'Please enter your email address.'
      };
    }

    if (!this.isValidEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address (e.g. name@example.com).'
      };
    }

    // 2. Real Supabase Database Flow
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert([{ email }]);

        if (error) {
          // Postgres code 23505 is unique_violation (duplicate email)
          if (error.code === '23505' || error.message?.toLowerCase().includes('unique') || error.message?.toLowerCase().includes('duplicate')) {
            return {
              success: true,
              alreadySubscribed: true,
              message: "You're already on the list! Keep an eye on your inbox for the next drop."
            };
          }

          console.error('Supabase subscription error:', error);
          return {
            success: false,
            message: 'Unable to save subscription right now. Please try again in a moment.'
          };
        }

        const newSubscriber = { email, subscribedAt: new Date().toISOString() };

        // Dispatch standard event for app components to react to
        window.dispatchEvent(new CustomEvent('newsletter:subscribed', {
          detail: newSubscriber
        }));

        return {
          success: true,
          alreadySubscribed: false,
          message: "Welcome to Raj Vir AI Studio! You're officially on the insider list.",
          subscriber: newSubscriber
        };
      } catch (networkErr) {
        console.error('Network failure connecting to Supabase:', networkErr);
        return {
          success: false,
          message: 'Connection failed. Please check your internet connection and try again.'
        };
      }
    }

    // 3. Fallback to local simulation if Supabase is not configured
    console.warn('Supabase credentials not detected in .env.local. Falling back to local storage preview.');
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const rawLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
      const subscribers = rawLocal ? JSON.parse(rawLocal) : [];
      const existing = subscribers.find((sub) => sub.email === email);

      if (existing) {
        return {
          success: true,
          alreadySubscribed: true,
          message: "You're already on the list! Keep an eye on your inbox for the next drop.",
          subscriber: existing
        };
      }

      const newSubscriber = { id: 'local_' + Date.now(), email, created_at: new Date().toISOString() };
      subscribers.push(newSubscriber);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscribers));

      window.dispatchEvent(new CustomEvent('newsletter:subscribed', {
        detail: newSubscriber
      }));

      return {
        success: true,
        alreadySubscribed: false,
        message: "Welcome to Raj Vir AI Studio! You're officially on the insider list.",
        subscriber: newSubscriber
      };
    } catch {
      return {
        success: true,
        alreadySubscribed: false,
        message: "Welcome to Raj Vir AI Studio! You're officially on the insider list."
      };
    }
  },

  /**
   * Fetch all subscribers (Admin function, requires authenticated Supabase session)
   * @returns {Promise<{success: boolean, data?: Array<any>, error?: string}>}
   */
  async getAllSubscribers() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching subscribers from Supabase:', error);
          return { success: false, error: error.message };
        }

        return { success: true, data: data || [] };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // LocalStorage fallback for testing
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return { success: true, data };
    } catch {
      return { success: true, data: [] };
    }
  },

  /**
   * Delete a subscriber by ID (Admin function)
   * @param {string} id 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async deleteSubscriber(id) {
    if (!id) return { success: false, error: 'Subscriber ID is required' };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting subscriber:', error);
          return { success: false, error: error.message };
        }

        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // LocalStorage fallback
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      let list = raw ? JSON.parse(raw) : [];
      list = list.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
      return { success: true };
    } catch {
      return { success: true };
    }
  },

  /**
   * Calculate subscriber metrics and growth points
   * @param {Array<any>} subscribers 
   */
  calculateStats(subscribers = []) {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let today = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    // Daily buckets for the chart (last 14 days)
    const dayBuckets = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dayBuckets[key] = { label, count: 0, date: key };
    }

    subscribers.forEach(sub => {
      const subDate = new Date(sub.created_at || sub.subscribedAt || now);
      if (subDate >= oneDayAgo) today++;
      if (subDate >= oneWeekAgo) thisWeek++;
      if (subDate >= oneMonthAgo) thisMonth++;

      const dateKey = subDate.toISOString().slice(0, 10);
      if (dayBuckets[dateKey]) {
        dayBuckets[dateKey].count++;
      }
    });

    // Calculate cumulative or daily points
    const chartPoints = Object.values(dayBuckets);

    return {
      total: subscribers.length,
      today,
      thisWeek,
      thisMonth,
      chartPoints
    };
  },

  /**
   * Export subscriber list as CSV file
   * @param {Array<any>} subscribers 
   */
  exportToCsv(subscribers = []) {
    if (!subscribers.length) {
      alert('No subscriber data available to export.');
      return;
    }

    const headers = ['ID', 'Email Address', 'Status', 'Subscription Date (UTC)'];
    const rows = subscribers.map(sub => [
      `"${sub.id || ''}"`,
      `"${sub.email || ''}"`,
      `"${sub.status || 'active'}"`,
      `"${sub.created_at || sub.subscribedAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);

    link.setAttribute('href', url);
    link.setAttribute('download', `ai_newsletter_subscribers_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
