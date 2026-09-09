export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer-content">
          <a href="#" class="brand-logo">
            <div class="brand-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.1 6.25 5.09 7.42V19a2 2 0 0 0 2 2h1.82a2 2 0 0 0 2-2v-1.58C17.9 16.25 20 13.37 20 10a8 8 0 0 0-8-8z"/>
                <path d="M9 10h.01"/>
                <path d="M15 10h.01"/>
                <path d="M9.5 14a3.5 3.5 0 0 0 5 0"/>
              </svg>
            </div>
            <span>Raj Vir <span class="brand-text-accent">AI Studio</span></span>
          </a>

          <ul class="footer-links">
            <li><a href="#why-subscribe" class="footer-link">Benefits</a></li>
            <li><a href="#whats-inside" class="footer-link">Curriculum</a></li>
            <li><a href="#how-it-works" class="footer-link">Process</a></li>
            <li><a href="#privacy" class="footer-link" id="link-privacy">Privacy Policy</a></li>
            <li><a href="#terms" class="footer-link" id="link-terms">Terms of Service</a></li>
          </ul>
        </div>

        <div class="footer-bottom">
          <p>© ${currentYear} Raj Vir AI Studio. All rights reserved.</p>
          <p>Practical AI insights, tools, and workflows for creators & builders.</p>
        </div>
      </div>
    </footer>
  `;
}
