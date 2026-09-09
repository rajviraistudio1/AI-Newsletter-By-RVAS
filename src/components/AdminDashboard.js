import { newsletterService } from '../services/newsletterService.js';
import { supabase } from '../services/supabaseClient.js';

let currentSubscribers = [];
let filteredSubscribers = [];

export function renderAdminDashboard() {
  return `
    <div class="admin-view-wrapper">
      <header class="admin-header">
        <div class="container">
          <div class="admin-header-content">
            <div class="admin-brand">
              <a href="#" class="brand-logo-link" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.75rem;">
                <div class="logo-mark">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.1 6.25 5.09 7.42V19a2 2 0 0 0 2 2h1.82a2 2 0 0 0 2-2v-1.58C17.9 16.25 20 13.37 20 10a8 8 0 0 0-8-8z"/>
                  </svg>
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.05rem; letter-spacing: -0.02em;">
                    Raj Vir <span class="gradient-brand">AI Studio</span>
                  </div>
                </div>
              </a>
              <span class="admin-badge-pill">
                <span class="pulse-dot"></span>
                Admin Dashboard
              </span>
            </div>

            <div class="admin-header-actions">
              <button class="btn-admin-secondary" id="btn-admin-back-site">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>View Website</span>
              </button>
              <button class="btn-admin-secondary" id="btn-admin-signout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-main">
        <div class="container">
          <div class="admin-welcome-bar">
            <h1 class="admin-title">
              Subscriber Analytics & Growth
            </h1>
            <p class="admin-subtitle">
              Live data from your Supabase PostgreSQL cluster with Row-Level Security enabled.
            </p>
          </div>

          <!-- KPI Metric Cards Grid -->
          <div class="admin-kpi-grid">
            <div class="admin-kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Total Subscribers</span>
                <div class="kpi-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <div class="kpi-value" id="kpi-total">--</div>
              <div class="kpi-footer">
                <span>All confirmed verified leads</span>
              </div>
            </div>

            <div class="admin-kpi-card kpi-card-green">
              <div class="kpi-header">
                <span class="kpi-title">New Today</span>
                <div class="kpi-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
              </div>
              <div class="kpi-value" id="kpi-today">--</div>
              <div class="kpi-footer">
                <span>Last 24-hour signups</span>
              </div>
            </div>

            <div class="admin-kpi-card kpi-card-purple">
              <div class="kpi-header">
                <span class="kpi-title">This Week</span>
                <div class="kpi-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
              <div class="kpi-value" id="kpi-week">--</div>
              <div class="kpi-footer">
                <span>Last 7 days volume</span>
              </div>
            </div>

            <div class="admin-kpi-card kpi-card-pink">
              <div class="kpi-header">
                <span class="kpi-title">This Month</span>
                <div class="kpi-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div class="kpi-value" id="kpi-month">--</div>
              <div class="kpi-footer">
                <span>Last 30 days trajectory</span>
              </div>
            </div>
          </div>

          <!-- Growth Chart Card -->
          <div class="admin-chart-card">
            <div class="chart-header">
              <div>
                <div class="chart-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Subscriber Growth Trend
                </div>
                <div class="chart-subtitle">Daily subscriber trajectory over the last 14 days</div>
              </div>
              <div id="chart-badge" style="font-size: 0.8rem; padding: 0.3rem 0.75rem; background: rgba(0, 240, 255, 0.08); border-radius: var(--radius-full); border: 1px solid rgba(0, 240, 255, 0.2); color: var(--color-brand-cyan);">
                Live Database Plot
              </div>
            </div>
            <div class="chart-svg-container" id="chart-container">
              <!-- SVG is dynamically inserted here -->
            </div>
          </div>

          <!-- Subscribers Management Table Card -->
          <div class="admin-table-card">
            <div class="table-toolbar">
              <div class="search-box-wrapper">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  id="subscriber-search" 
                  class="search-input" 
                  placeholder="Search subscribers by email..." 
                  autocomplete="off"
                />
              </div>

              <div class="table-actions">
                <button class="btn-admin-secondary" id="btn-refresh" title="Reload from Supabase">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M3 21v-5h5"></path>
                  </svg>
                  <span>Refresh</span>
                </button>

                <button class="btn-admin-secondary" id="btn-export-csv" title="Download CSV report">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div class="table-responsive-wrapper">
              <table class="subscribers-table">
                <thead>
                  <tr>
                    <th style="width: 60px;">#</th>
                    <th>Email Address</th>
                    <th>Subscribed Date</th>
                    <th>Status</th>
                    <th style="text-align: right; width: 110px;">Actions</th>
                  </tr>
                </thead>
                <tbody id="subscribers-table-body">
                  <tr>
                    <td colspan="5" class="table-empty-state">
                      <div class="table-empty-icon">⏳</div>
                      <div>Loading subscriber records from database...</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export async function attachAdminDashboardHandlers() {
  const backBtn = document.getElementById('btn-admin-back-site');
  const signoutBtn = document.getElementById('btn-admin-signout');
  const refreshBtn = document.getElementById('btn-refresh');
  const exportBtn = document.getElementById('btn-export-csv');
  const searchInput = document.getElementById('subscriber-search');

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.hash = '';
      if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    });
  }

  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      if (supabase) {
        await supabase.auth.signOut();
      }
      window.location.hash = '';
      if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
        window.history.pushState({}, '', '/');
      }
      window.location.reload();
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      loadSubscribers();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      newsletterService.exportToCsv(filteredSubscribers.length ? filteredSubscribers : currentSubscribers);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        filteredSubscribers = [...currentSubscribers];
      } else {
        filteredSubscribers = currentSubscribers.filter(s => 
          (s.email || '').toLowerCase().includes(query)
        );
      }
      renderTableRows(filteredSubscribers);
    });
  }

  // Initial load
  await loadSubscribers();
}

async function loadSubscribers() {
  const tbody = document.getElementById('subscribers-table-body');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty-state">
          <div class="table-empty-icon">⏳</div>
          <div>Loading subscribers from Supabase...</div>
        </td>
      </tr>
    `;
  }

  const res = await newsletterService.getAllSubscribers();

  if (!res.success) {
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="table-empty-state" style="color: #ff4a6e;">
            <div class="table-empty-icon">⚠️</div>
            <div style="font-weight: 600; margin-bottom: 0.35rem;">Access Denied or Connection Error</div>
            <div style="font-size: 0.85rem; color: var(--color-text-muted);">${res.error || 'Please ensure you are signed in with an admin account and that the admin RLS policy is active.'}</div>
          </td>
        </tr>
      `;
    }
    return;
  }

  currentSubscribers = res.data || [];
  filteredSubscribers = [...currentSubscribers];

  // Update KPIs
  const stats = newsletterService.calculateStats(currentSubscribers);
  updateKpiValues(stats);

  // Render Chart
  renderGrowthChart(stats.chartPoints, stats.total);

  // Render Table
  renderTableRows(filteredSubscribers);
}

function updateKpiValues(stats) {
  const elTotal = document.getElementById('kpi-total');
  const elToday = document.getElementById('kpi-today');
  const elWeek = document.getElementById('kpi-week');
  const elMonth = document.getElementById('kpi-month');

  if (elTotal) elTotal.textContent = stats.total.toLocaleString();
  if (elToday) elToday.textContent = `+${stats.today}`;
  if (elWeek) elWeek.textContent = `+${stats.thisWeek}`;
  if (elMonth) elMonth.textContent = `+${stats.thisMonth}`;
}

function renderTableRows(subscribers) {
  const tbody = document.getElementById('subscribers-table-body');
  if (!tbody) return;

  if (!subscribers.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty-state">
          <div class="table-empty-icon">🔍</div>
          <div style="font-weight: 600; margin-bottom: 0.25rem;">No subscribers found</div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">Try searching with another keyword or wait for new signups.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = subscribers.map((sub, index) => {
    const rawDate = sub.created_at || sub.subscribedAt;
    const formattedDate = rawDate ? new Date(rawDate).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Just now';

    return `
      <tr id="row-${sub.id}">
        <td style="color: var(--color-text-muted); font-size: 0.8rem;">${index + 1}</td>
        <td>
          <div class="email-cell">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span>${escapeHtml(sub.email)}</span>
          </div>
        </td>
        <td class="date-cell">${formattedDate}</td>
        <td>
          <span class="status-badge status-active">
            <span class="pulse-dot" style="width: 6px; height: 6px;"></span>
            ${sub.status || 'Active'}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn-admin-danger" data-id="${sub.id}" data-email="${escapeHtml(sub.email)}" title="Delete subscriber">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            <span>Delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach delete buttons
  tbody.querySelectorAll('.btn-admin-danger').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = btn.getAttribute('data-id');
      const email = btn.getAttribute('data-email');
      if (!id) return;

      const confirmed = window.confirm(`Are you sure you want to permanently remove "${email}" from the subscriber list?`);
      if (!confirmed) return;

      btn.disabled = true;
      btn.innerHTML = `<span>Deleting...</span>`;

      const result = await newsletterService.deleteSubscriber(id);
      if (result.success) {
        // Optimistic UI update
        currentSubscribers = currentSubscribers.filter(s => s.id !== id);
        filteredSubscribers = filteredSubscribers.filter(s => s.id !== id);
        renderTableRows(filteredSubscribers);
        const stats = newsletterService.calculateStats(currentSubscribers);
        updateKpiValues(stats);
        renderGrowthChart(stats.chartPoints, stats.total);
      } else {
        alert(`Failed to delete subscriber: ${result.error || 'Permission denied'}`);
        btn.disabled = false;
        btn.innerHTML = `<span>Delete</span>`;
      }
    });
  });
}

/**
 * Modern SVG Area and Line Growth Chart
 */
function renderGrowthChart(points = [], totalCount = 0) {
  const container = document.getElementById('chart-container');
  if (!container) return;

  if (!points.length) {
    container.innerHTML = '<div style="color: var(--color-text-muted); text-align: center; padding: 3rem;">No growth data points yet.</div>';
    return;
  }

  const width = 900;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate cumulative trend
  let running = Math.max(0, totalCount - points.reduce((acc, p) => acc + p.count, 0));
  const cumulativeData = points.map(p => {
    running += p.count;
    return { ...p, cumulative: running };
  });

  const maxVal = Math.max(5, ...cumulativeData.map(d => d.cumulative));
  const minVal = 0;

  const getX = (idx) => paddingX + (idx / (cumulativeData.length - 1)) * (width - 2 * paddingX);
  const getY = (val) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);

  // Generate SVG path coordinates
  const coords = cumulativeData.map((d, idx) => ({ x: getX(idx), y: getY(d.cumulative) }));

  // Create smooth curved line
  let linePath = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const midX = (p0.x + p1.x) / 2;
    linePath += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  // Area under path
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

  // Grid lines
  const gridLines = [0, 0.5, 1].map(ratio => {
    const yVal = height - paddingY - ratio * (height - 2 * paddingY);
    return `<line x1="${paddingX}" y1="${yVal}" x2="${width - paddingX}" y2="${yVal}" class="chart-grid-line" />`;
  }).join('');

  // Labels & points
  const pointsAndLabels = cumulativeData.map((d, idx) => {
    const pt = coords[idx];
    const showLabel = idx % 2 === 0 || idx === cumulativeData.length - 1;
    return `
      <g>
        <circle cx="${pt.x}" cy="${pt.y}" r="4.5" class="chart-point">
          <title>${d.label}: ${d.cumulative} total subscribers (+${d.count} new)</title>
        </circle>
        ${showLabel ? `<text x="${pt.x}" y="${height - 10}" class="chart-label">${d.label}</text>` : ''}
      </g>
    `;
  }).join('');

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="adminChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.5"/>
          <stop offset="60%" stop-color="#7928ca" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#7928ca" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" class="chart-area" />
      <path d="${linePath}" class="chart-path" />
      ${pointsAndLabels}
    </svg>
  `;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}
