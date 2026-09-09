export function renderWhySubscribe() {
  const benefits = [
    {
      icon: `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h10"/>
          <path d="m9 16 2 2 4-4"/>
        </svg>
      `,
      colorClass: 'icon-cyan',
      tag: 'Step-by-Step',
      title: 'Practical AI Tutorials',
      description: 'Zero theoretical fluff. Get clear, step-by-step breakdowns to build apps, automate repetitive tasks, and master modern AI models in minutes.'
    },
    {
      icon: `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="m9 9 3 3-3 3"/>
          <path d="m15 15h.01"/>
        </svg>
      `,
      colorClass: 'icon-purple',
      tag: 'Handpicked Stack',
      title: 'Useful AI Tools & Workflows',
      description: 'Discover tested tools and production-ready workflows that actually save hours every week, curated without paid bias or hype.'
    },
    {
      icon: `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m13 2-2 2.5V8l5 2V8l-3-6Z"/>
          <path d="M13 14 9 8"/>
          <path d="M14 14l3-6"/>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-7.5c-.5 3.5-2 6-4 7.5S5 13 5 15a7 7 0 0 0 7 7Z"/>
        </svg>
      `,
      colorClass: 'icon-blue',
      tag: 'Signal Over Noise',
      title: 'Latest AI Updates',
      description: 'Stay ahead of the lightning-fast AI cycle with concise, high-signal recaps of breakthrough research, model releases, and market shifts.'
    },
    {
      icon: `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
          <path d="m16 16 3 3"/>
        </svg>
      `,
      colorClass: 'icon-emerald',
      tag: 'Productivity Multiplier',
      title: 'Tips to Work Smarter with AI',
      description: 'Actionable prompt engineering blueprints, context engineering techniques, and creative shortcuts to elevate your daily productivity.'
    }
  ];

  return `
    <section class="section" id="why-subscribe">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Core Advantages</div>
          <h2 class="section-title">Why Subscribe to <span class="gradient-text">Raj Vir AI Studio</span>?</h2>
          <p class="section-subtitle">
            Cut through the noise of modern AI developments. We do the heavy lifting of testing, distilling, and curating so you gain a competitive edge.
          </p>
        </div>

        <div class="benefits-grid">
          ${benefits.map(b => `
            <div class="glass-card benefit-card">
              <div class="card-top">
                <div class="icon-wrapper ${b.colorClass}">
                  ${b.icon}
                </div>
                <span class="card-badge">${b.tag}</span>
              </div>
              <h3 class="benefit-title">${b.title}</h3>
              <p class="benefit-desc">${b.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
