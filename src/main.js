import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';

import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderWhySubscribe } from './components/WhySubscribe.js';
import { renderWhatsInside } from './components/WhatsInside.js';
import { renderHowItWorks } from './components/HowItWorks.js';
import { renderFinalCta } from './components/FinalCta.js';
import { renderFooter } from './components/Footer.js';
import { newsletterService } from './services/newsletterService.js';

function setupApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Render Single Page Structure
  app.innerHTML = `
    <div class="bg-decorations">
      <div class="bg-grid"></div>
      <div class="glow-orb glow-orb-1"></div>
      <div class="glow-orb glow-orb-2"></div>
      <div class="glow-orb glow-orb-3"></div>
    </div>

    ${renderNavbar()}

    <main>
      ${renderHero()}
      ${renderWhySubscribe()}
      ${renderWhatsInside()}
      ${renderHowItWorks()}
      ${renderFinalCta()}
    </main>

    ${renderFooter()}
  `;

  // Attach dynamic behaviors
  initNavbarScroll();
  initThemeManager();
  attachFormHandler('hero-form', 'hero-email', 'hero-btn', 'hero-feedback');
  attachFormHandler('final-form', 'final-email', 'final-btn', 'final-feedback');
  attachPlaceholderHandlers();
}

const THEME_KEY = 'rajvir_ai_theme';

/**
 * Initializes and manages light/dark mode switching with persistence
 */
function initThemeManager() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const currentTheme = savedTheme || 'dark';
  applyTheme(currentTheme);

  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isCurrentLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isCurrentLight ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

function applyTheme(theme) {
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const toggleBtn = document.getElementById('theme-toggle');

  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleBtn) {
      toggleBtn.setAttribute('title', 'Switch to dark mode');
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
    if (toggleIcon) {
      // Moon icon: signifies clicking will switch back to dark mode
      toggleIcon.innerHTML = `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleBtn) {
      toggleBtn.setAttribute('title', 'Switch to light mode');
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
    if (toggleIcon) {
      // Sun icon: signifies clicking will switch to light mode
      toggleIcon.innerHTML = `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
    }
  }
}


/**
 * Adds background glass styling when scrolling past header threshold
 */
function initNavbarScroll() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Configures subscription form logic, state transitions, validation, and feedback
 */
function attachFormHandler(formId, inputId, btnId, feedbackId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  const feedback = document.getElementById(feedbackId);

  if (!form || !input || !btn || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = input.value.trim();
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Quick client-side check
    if (!email) {
      feedback.classList.add('error');
      feedback.textContent = 'Please provide your email address.';
      input.focus();
      return;
    }

    if (!newsletterService.isValidEmail(email)) {
      feedback.classList.add('error');
      feedback.textContent = 'Please enter a valid email format (e.g. you@example.com).';
      input.focus();
      return;
    }

    // Set Loading State
    const originalBtnHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      <span>Subscribing...</span>
    `;

    try {
      const result = await newsletterService.subscribe(email);

      if (result.success) {
        // Replace form or display sleek success box
        const formContainer = form.parentElement;
        formContainer.innerHTML = `
          <div class="subscription-success-box">
            <div class="success-check-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <div class="success-text-title">${result.alreadySubscribed ? 'Welcome back!' : 'You\'re officially on the list! 🎉'}</div>
              <div class="success-text-desc">${result.message} Check your inbox soon for Issue #01.</div>
            </div>
          </div>
        `;
      } else {
        feedback.classList.add('error');
        feedback.textContent = result.message;
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
      }
    } catch (err) {
      feedback.classList.add('error');
      feedback.textContent = 'An unexpected error occurred. Please try again.';
      btn.disabled = false;
      btn.innerHTML = originalBtnHtml;
    }
  });

  // Clear error message when user starts typing
  input.addEventListener('input', () => {
    if (feedback.classList.contains('error')) {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }
  });
}

/**
 * Provide pleasant feedback for placeholder links (Privacy / Terms)
 */
function attachPlaceholderHandlers() {
  const privacy = document.getElementById('link-privacy');
  const terms = document.getElementById('link-terms');

  const showNotice = (e, title) => {
    e.preventDefault();
    alert(`${title}: This is a placeholder for Raj Vir AI Studio. Standard privacy & terms policies will be active prior to public distribution.`);
  };

  if (privacy) privacy.addEventListener('click', (e) => showNotice(e, 'Privacy Policy'));
  if (terms) terms.addEventListener('click', (e) => showNotice(e, 'Terms of Service'));
}

// Global spinner animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', setupApp);
