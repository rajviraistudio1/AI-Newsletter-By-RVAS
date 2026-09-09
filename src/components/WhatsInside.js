export function renderWhatsInside() {
  const contents = [
    {
      category: 'Tools & Tutorials',
      colorTag: 'tag-cyan',
      title: 'AI Tools & Tutorials',
      desc: 'In-depth walk-throughs of newly released APIs, agent frameworks, open-weight models, and local execution stacks.',
      bullets: [
        'Detailed step-by-step guides',
        'Direct links to GitHub repositories',
        'Copy-paste code snippets'
      ]
    },
    {
      category: 'Automation',
      colorTag: 'tag-purple',
      title: 'Productivity Workflows',
      desc: 'Battle-tested setups integrating AI into coding, content creation, data analysis, and everyday desktop workflows.',
      bullets: [
        'Tool integration recipes',
        'Custom prompt systems',
        'Automation flowcharts'
      ]
    },
    {
      category: 'Intelligence',
      colorTag: 'tag-blue',
      title: 'AI News & Updates',
      desc: 'Filtered analysis of major model releases, benchmarks, research papers, and what each actually means for your work.',
      bullets: [
        '3-minute executive summaries',
        'No hype, unbiased analysis',
        'Key takeaways & industry impact'
      ]
    },
    {
      category: 'Hands-on',
      colorTag: 'tag-emerald',
      title: 'Practical Projects',
      desc: 'Full project recipes from idea to deployed MVP: automated agents, retrieval pipelines (RAG), and smart AI tools.',
      bullets: [
        'Architecture breakdowns',
        'Source code & starter kits',
        'Real-world implementation tips'
      ]
    }
  ];

  return `
    <section class="section" id="whats-inside">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Issue Blueprint</div>
          <h2 class="section-title">What's Inside Every <span class="gradient-text">Edition</span></h2>
          <p class="section-subtitle">
            Every edition is crafted as a practical field guide with direct, actionable takeaways you can apply the same day.
          </p>
        </div>

        <div class="whats-inside-grid">
          ${contents.map(item => `
            <div class="glass-card inside-card">
              <span class="inside-category-tag ${item.colorTag}">${item.category}</span>
              <h3 class="inside-title">${item.title}</h3>
              <p class="inside-desc">${item.desc}</p>
              
              <ul class="inside-bullet-list">
                ${item.bullets.map(b => `
                  <li class="inside-bullet-item">
                    <span class="inside-bullet-dot"></span>
                    <span>${b}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
