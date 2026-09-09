/**
 * Newsletter Service
 * 
 * Provides an abstraction for handling newsletter subscriptions.
 * Currently uses client-side persistence (localStorage) with simulated latency.
 * Designed to easily switch to a backend API, Supabase, Firebase, or serverless function
 * in future phases without altering any UI components.
 */

const STORAGE_KEY = 'rajvir_newsletter_subscribers';

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
   * Fetch all local subscribers (for demonstration and persistence check).
   * @returns {Array<{email: string, subscribedAt: string}>}
   */
  getSubscribers() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Subscribe an email address to the newsletter.
   * In a future step, replace the body of this method with:
   *   return await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
   * 
   * @param {string} rawEmail 
   * @returns {Promise<{success: boolean, message: string, subscriber?: object}>}
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

    // 2. Simulate realistic network latency for sleek UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 3. Mock database persistence check
    const subscribers = this.getSubscribers();
    const existing = subscribers.find((sub) => sub.email === email);

    if (existing) {
      return {
        success: true,
        alreadySubscribed: true,
        message: "You're already on the list! Keep an eye on your inbox for the next drop.",
        subscriber: existing
      };
    }

    // 4. Save subscriber
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    // 5. Dispatch standard event for app components to react to
    window.dispatchEvent(new CustomEvent('newsletter:subscribed', {
      detail: newSubscriber
    }));

    return {
      success: true,
      alreadySubscribed: false,
      message: "Welcome to Raj Vir AI Studio! You're officially on the insider list.",
      subscriber: newSubscriber
    };
  }
};
