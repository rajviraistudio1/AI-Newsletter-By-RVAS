export function renderHowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Subscribe in Seconds',
      desc: 'Enter your email address above or below. Free forever, no credit card required, and instant confirmation without friction.'
    },
    {
      num: '02',
      title: 'Receive Weekly Digest',
      desc: 'Get curated, high-density AI insights, tools, and tutorials straight to your inbox each week, formatted for swift reading.'
    },
    {
      num: '03',
      title: 'Learn & Build',
      desc: 'Put knowledge into practice immediately. Use the workflow blueprints and tutorials to build smarter systems and projects.'
    }
  ];

  return `
    <section class="section" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Simple Process</div>
          <h2 class="section-title">How It <span class="gradient-text">Works</span></h2>
          <p class="section-subtitle">
            A frictionless pipeline to keep your AI expertise ahead of the curve.
          </p>
        </div>

        <div class="steps-container">
          ${steps.map((step, idx) => `
            <div class="glass-card step-card">
              <span class="step-number">${step.num}</span>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-desc">${step.desc}</p>
              ${idx < steps.length - 1 ? `<div class="step-connector"></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
