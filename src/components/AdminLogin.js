import { supabase } from '../services/supabaseClient.js';

export function renderAdminLogin() {
  return `
    <div class="admin-login-wrapper">
      <div class="bg-decorations">
        <div class="bg-grid"></div>
        <div class="glow-orb glow-orb-1"></div>
        <div class="glow-orb glow-orb-2"></div>
      </div>

      <div class="admin-login-card">
        <div class="admin-login-header">
          <div class="login-lock-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 class="admin-login-title">Admin Access Portal</h2>
          <p class="admin-login-desc">Sign in with your verified Supabase admin credentials to manage subscribers and analytics.</p>
        </div>

        <form id="admin-login-form" novalidate>
          <div class="login-field">
            <label class="login-label" for="admin-email">Admin Email</label>
            <input 
              type="email" 
              id="admin-email" 
              class="login-input" 
              placeholder="admin@rajviraistudio.com" 
              required
              autocomplete="email"
            />
          </div>

          <div class="login-field">
            <label class="login-label" for="admin-password">Password</label>
            <input 
              type="password" 
              id="admin-password" 
              class="login-input" 
              placeholder="••••••••••••" 
              required
              autocomplete="current-password"
            />
          </div>

          <div class="form-feedback" id="admin-login-feedback" role="status" aria-live="polite"></div>

          <button type="submit" class="btn-primary login-btn" id="admin-login-btn">
            <span>Sign In to Dashboard</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </form>

        <a href="#" class="login-back-link" id="btn-back-to-site">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span>Return to Public Website</span>
        </a>
      </div>
    </div>
  `;
}

export function attachAdminLoginHandlers(onSuccess) {
  const form = document.getElementById('admin-login-form');
  const emailInput = document.getElementById('admin-email');
  const passInput = document.getElementById('admin-password');
  const btn = document.getElementById('admin-login-btn');
  const feedback = document.getElementById('admin-login-feedback');
  const backBtn = document.getElementById('btn-back-to-site');

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
      if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    });
  }

  if (!form || !emailInput || !passInput || !btn || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passInput.value;

    feedback.className = 'form-feedback';
    feedback.textContent = '';

    if (!email || !password) {
      feedback.classList.add('error');
      feedback.textContent = 'Please enter both your admin email and password.';
      return;
    }

    const origBtnHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      <span>Verifying credentials...</span>
    `;

    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        feedback.classList.add('error');
        feedback.textContent = error.message || 'Invalid login credentials.';
        btn.disabled = false;
        btn.innerHTML = origBtnHtml;
        return;
      }

      // Success
      if (typeof onSuccess === 'function') {
        onSuccess(data.session);
      }
    } catch (err) {
      feedback.classList.add('error');
      feedback.textContent = err.message || 'An unexpected error occurred during login.';
      btn.disabled = false;
      btn.innerHTML = origBtnHtml;
    }
  });
}
