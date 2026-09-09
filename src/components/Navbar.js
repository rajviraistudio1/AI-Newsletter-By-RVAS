export function renderNavbar() {
  return `
    <nav class="navbar" id="main-nav">
      <div class="container">
        <a href="#" class="brand-logo">
          <div class="brand-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.1 6.25 5.09 7.42V19a2 2 0 0 0 2 2h1.82a2 2 0 0 0 2-2v-1.58C17.9 16.25 20 13.37 20 10a8 8 0 0 0-8-8z"/>
              <path d="M9 10h.01"/>
              <path d="M15 10h.01"/>
              <path d="M9.5 14a3.5 3.5 0 0 0 5 0"/>
            </svg>
          </div>
          <span>Raj Vir <span class="brand-text-accent">AI Studio</span></span>
        </a>

        <ul class="nav-menu">
          <li><a href="#why-subscribe" class="nav-link">Why Subscribe</a></li>
          <li><a href="#whats-inside" class="nav-link">What's Inside</a></li>
          <li><a href="#how-it-works" class="nav-link">How It Works</a></li>
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle light or dark mode" title="Toggle theme">
            <span id="theme-toggle-icon">
              <!-- Default Moon icon for dark mode (click switches to light mode) -->
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </span>
          </button>

          <a href="#hero-subscribe" class="btn-primary nav-cta">
            <span>Join Free</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  `;
}
