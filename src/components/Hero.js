export function renderHero() {
  return `
    <section class="hero-section" id="hero">
      <div class="container">
        <div class="hero-badge-container">
          <div class="hero-pill-badge">
            <span class="pulse-dot"></span>
            <span>Issue #01 Launching This Week • High-Signal AI</span>
          </div>
        </div>

        <h1 class="hero-headline">
          Stay Ahead in <span class="gradient-brand">AI</span>
        </h1>

        <p class="hero-description">
          Subscribe to <strong>Raj Vir AI Studio</strong> to receive practical AI tools, 
          hands-on tutorials, productivity tips, proven workflows, and essential AI updates 
          delivered directly to your inbox every week.
        </p>

        <div class="subscribe-form-wrapper" id="hero-subscribe">
          <form class="subscribe-form" id="hero-form" novalidate>
            <div class="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <input 
              type="email" 
              class="subscribe-input" 
              id="hero-email" 
              placeholder="Enter your work or personal email..." 
              required
              autocomplete="email"
            />
            <button type="submit" class="btn-primary subscribe-btn" id="hero-btn">
              <span>Subscribe Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div class="form-feedback" id="hero-feedback" role="status" aria-live="polite"></div>

          <div class="subscribe-hints">
            <span class="hint-item">
              <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              100% Free Weekly Edition
            </span>
            <span class="hint-item">
              <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              No spam. Unsubscribe in 1 click
            </span>
            <span class="hint-item">
              <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              5-minute read
            </span>
          </div>
        </div>

        <div class="hero-stats-row">
          <div class="stat-item">
            <span class="stat-number">Weekly</span>
            <span class="stat-label">Curated Cadence</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">0% Fluff</span>
            <span class="stat-label">Pure Actionable Value</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100% Free</span>
            <span class="stat-label">Subscriber Access</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5-Min Read</span>
            <span class="stat-label">Engineered For Busy Minds</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
