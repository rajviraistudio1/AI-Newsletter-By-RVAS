export function renderFinalCta() {
  return `
    <section class="final-cta-section" id="final-cta">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-title">
            Don't Get Left Behind in the <br/>
            <span class="gradient-brand">AI Revolution</span>
          </h2>
          <p class="cta-desc">
            Join developers, creators, and professionals mastering modern AI. 
            Practical workflows, handpicked tools, and no noise — straight to your inbox.
          </p>

          <div class="subscribe-form-wrapper">
            <form class="subscribe-form" id="final-form" novalidate>
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <input 
                type="email" 
                class="subscribe-input" 
                id="final-email" 
                placeholder="Enter your email to join..." 
                required
                autocomplete="email"
              />
              <button type="submit" class="btn-primary subscribe-btn" id="final-btn">
                <span>Subscribe Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            <div class="form-feedback" id="final-feedback" role="status" aria-live="polite"></div>

            <div class="subscribe-hints">
              <span class="hint-item">
                <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Weekly Edition
              </span>
              <span class="hint-item">
                <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Zero Spam
              </span>
              <span class="hint-item">
                <svg class="hint-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Instant Unsubscribe Anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
