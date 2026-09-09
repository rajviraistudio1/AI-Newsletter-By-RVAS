/**
 * Newsletter Service
 * 
 * Centralized service for newsletter subscription handling.
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

    // 3. Fallback to local simulation if Supabase is not yet configured with keys
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

      const newSubscriber = { email, subscribedAt: new Date().toISOString() };
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
  }
};
