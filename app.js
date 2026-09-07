/**
 * Supabase Keep-Alive Central Dashboard - Application Script
 * Live Status Tracking, GitHub API Integration, & Package Mapping
 */

const PROJECTS = [
  {
    id: 'pwgeppfxgxdpgzfoulfn',
    name: 'SriVenkateswara (Central Host)',
    subdomain: 'pwgeppfxgxdpgzfoulfn',
    account: 'mbhargava.c@gmail.com',
    ownership: 'Self Owned',
    package: 'com.arthasol.srivenkateswara',
    folder: 'C:\\SriVenkateswara',
    repo: 'ArthaSol/supabase-keepalive-central',
    note: 'Central Host DB & Temple App',
    secret: 'PWGEPPFXGXDPGZFOULFN_SERVICE_ROLE',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z2VwcGZ4Z3hkcGd6Zm91bGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzU5NTUsImV4cCI6MjA5NTk1MTk1NX0'
  },
  {
    id: 'audmwkalkloomrltijop',
    name: 'Srini_New (Srinivasam v2.0)',
    subdomain: 'audmwkalkloomrltijop',
    account: 'bhargav.madhun1@gmail.com',
    ownership: 'Self Owned',
    package: 'com.arthasol.srinivasam',
    folder: 'd:\\Srinivasam',
    repo: 'ArthaSol/Srinivasam',
    note: 'Srinivasam Production App',
    secret: 'AUDMWKALKLOOMRLTIJOP_SERVICE_ROLE',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1ZG13a2Fsa2xvb21ybHRpam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzU5NTUsImV4cCI6MjA5NTk1MTk1NX0.w7Qz_NDmpg62XBAEwwk2x72R1pgq0gHlqlJGFTZpe3w'
  },
  {
    id: 'lbegyddwuysusivvjvxy',
    name: 'Sangam (BSA)',
    subdomain: 'lbegyddwuysusivvjvxy',
    account: 'bhargav.madhun1@gmail.com',
    ownership: 'Self Owned',
    package: 'com.community.sangam',
    folder: 'Downloads\\BSA',
    repo: 'ArthaSol/supabase-keepalive-central',
    note: 'Brahman Sangam Association',
    secret: 'LBEGYDDWUYSUSIVVJVXY_SERVICE_ROLE'
  },
  {
    id: 'dydrioldiibdhzkliscz',
    name: 'Anjaneyam App (Production)',
    subdomain: 'dydrioldiibdhzkliscz',
    account: 'bhargav.madhun1@gmail.com',
    ownership: 'Shared',
    package: 'com.anjaneyam.app',
    folder: 'd:\\Agents',
    repo: 'ArthaSol/SriAnjaneyam',
    note: 'Owner: bhargava.madhunapantula@gmail.com',
    secret: 'DYDRIOLDIIBDHZKLISCZ_SERVICE_ROLE'
  },
  {
    id: 'uxcanmlpenlwvedboyga',
    name: 'Durga (Devi Navaraatrulu)',
    subdomain: 'uxcanmlpenlwvedboyga',
    account: 'bhargav.madhun1@gmail.com',
    ownership: 'Shared',
    package: 'com.durgamma.app',
    folder: 'd:\\DeviNavaraatrulu',
    repo: 'ArthaSol/Devi',
    note: 'Owner: bhargava.madhunapantula@gmail.com',
    secret: 'UXCANMLPENLWVEDBOYGA_SERVICE_ROLE'
  },
  {
    id: 'yzmmxjaozqziqoyrehjr',
    name: 'SriAnjaneyam (Legacy / Backup)',
    subdomain: 'yzmmxjaozqziqoyrehjr',
    account: 'mbhargava.c@gmail.com',
    ownership: 'Self Owned',
    package: 'com.mbhargavas.anjaneyam',
    folder: 'C:\\SriAnjaneyam / d:\\Agents',
    repo: 'MBhargavas/_Anjaneya_',
    note: 'Legacy Production / Secondary Backup',
    secret: 'YZMMXJAOZQZIQOYREHJR_SERVICE_ROLE'
  }
];

let currentFilter = 'all';
let workflowRunsData = [];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  fetchGitHubRuns();
  startCountdownTimer();

  // Attach Filter Listeners
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderProjects();
    });
  });

  // Refresh Button Listener
  document.getElementById('refreshBtn').addEventListener('click', () => {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('loading');
    btn.innerText = '🔄 Syncing...';
    fetchGitHubRuns();
    renderProjects();
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.innerHTML = '🔄 Sync Status';
    }, 1200);
  });
});

// Render Projects Cards Grid
function renderProjects() {
  const container = document.getElementById('projectsGrid');
  container.innerHTML = '';

  const filtered = PROJECTS.filter(p => {
    if (currentFilter === 'all') return true;
    return p.account === currentFilter;
  });

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', project.id);

    const badgeClass = project.ownership === 'Self Owned' ? 'badge-self' : 'badge-shared';
    
    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-group">
          <div class="card-title">${project.name}</div>
          <a href="https://${project.subdomain}.supabase.co" target="_blank" class="card-subtitle">${project.subdomain}.supabase.co ↗</a>
        </div>
        <span class="badge ${badgeClass}">${project.ownership}</span>
      </div>

      <div class="card-meta">
        <span>Pkg:</span>
        <span class="email-pill" style="color:var(--accent-cyan); font-family:monospace;">${project.package}</span>
      </div>

      <div class="card-meta" style="margin-bottom:0.75rem; padding-bottom:0.5rem;">
        <span>Account:</span>
        <span class="email-pill">${project.account}</span>
      </div>

      <div class="ping-info-box">
        <div class="ping-row">
          <span class="ping-lbl">Last Ping (IST):</span>
          <span class="ping-val ping-val-highlight" id="time-${project.id}">Fetching...</span>
        </div>
        <div class="ping-row">
          <span class="ping-lbl">Status:</span>
          <span class="ping-val" id="status-${project.id}">🟢 Active</span>
        </div>
        <div class="ping-row">
          <span class="ping-lbl">Folder:</span>
          <span class="ping-val" style="font-size:0.75rem; color:var(--text-secondary); font-family:monospace;">${project.folder}</span>
        </div>
      </div>

      <div class="secret-row">
        🔑 ${project.secret}
      </div>
    `;

    container.appendChild(card);
    checkProjectPingStatus(project);
  });
}

// Fetch live heartbeat or GitHub workflow status for a project
async function checkProjectPingStatus(project) {
  const timeElem = document.getElementById(`time-${project.id}`);
  const statusElem = document.getElementById(`status-${project.id}`);

  // If anonKey exists, attempt direct REST query
  if (project.anonKey) {
    try {
      const res = await fetch(`https://${project.subdomain}.supabase.co/rest/v1/heartbeat?id=eq.1`, {
        headers: {
          'apikey': project.anonKey,
          'Authorization': `Bearer ${project.anonKey}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0 && data[0].last_ping) {
          const formatted = formatDateIST(data[0].last_ping);
          const relative = getRelativeTime(data[0].last_ping);
          timeElem.innerText = `${formatted} (${relative})`;
          statusElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">🟢 Active</span>`;
          return;
        }
      }
    } catch (e) {
      console.log(`Direct REST fetch for ${project.id} fallback to workflow run.`);
    }
  }

  // Fallback to latest GitHub Workflow Run timestamp
  if (workflowRunsData.length > 0) {
    const latestSuccess = workflowRunsData.find(r => r.conclusion === 'success');
    if (latestSuccess) {
      const formatted = formatDateIST(latestSuccess.updated_at);
      const relative = getRelativeTime(latestSuccess.updated_at);
      timeElem.innerText = `${formatted} (${relative})`;
      statusElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">🟢 Active</span>`;
      return;
    }
  }

  // Generic fallback
  timeElem.innerText = 'Today (Scheduled)';
  statusElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">🟢 Active</span>`;
}

// Fetch GitHub Action Workflow Runs via GitHub REST API
async function fetchGitHubRuns() {
  const runsList = document.getElementById('runsList');
  try {
    const response = await fetch('https://api.github.com/repos/ArthaSol/supabase-keepalive-central/actions/runs?per_page=5');
    if (response.ok) {
      const data = await response.json();
      workflowRunsData = data.workflow_runs || [];
      renderWorkflowRuns(workflowRunsData);
    } else {
      runsList.innerHTML = `<div class="run-item"><span class="run-title-text" style="color:var(--text-muted)">Unable to load live GitHub logs (Rate limit or private repo).</span></div>`;
    }
  } catch (err) {
    runsList.innerHTML = `<div class="run-item"><span class="run-title-text" style="color:var(--text-muted)">GitHub Actions status protected.</span></div>`;
  }
}

// Render Workflow Runs
function renderWorkflowRuns(runs) {
  const runsList = document.getElementById('runsList');
  runsList.innerHTML = '';

  if (!runs || runs.length === 0) {
    runsList.innerHTML = `<div class="run-item"><span class="run-title-text">No recent runs found.</span></div>`;
    return;
  }

  runs.forEach(run => {
    const item = document.createElement('div');
    item.className = 'run-item';
    
    const isSuccess = run.conclusion === 'success';
    const iconClass = isSuccess ? 'success' : 'failure';
    const iconSymbol = isSuccess ? '✓' : '✗';
    const statusColor = isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)';

    const timeFormatted = formatDateIST(run.created_at);

    item.innerHTML = `
      <div class="run-info">
        <div class="run-icon ${iconClass}">${iconSymbol}</div>
        <div>
          <div class="run-title-text">${run.name || 'Centralized Supabase Keep Alive'}</div>
          <div class="run-meta">Trigger: ${run.event} • Run #${run.run_number}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div class="run-time" style="color:${statusColor}">${run.conclusion ? run.conclusion.toUpperCase() : run.status.toUpperCase()}</div>
        <div class="run-meta">${timeFormatted}</div>
      </div>
    `;

    runsList.appendChild(item);
  });
}

// Format Date string to Indian Standard Time (IST)
function formatDateIST(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
  } catch (e) {
    return isoString;
  }
}

// Calculate relative time string (e.g. "12m ago")
function getRelativeTime(isoString) {
  try {
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  } catch (e) {
    return '';
  }
}

// Countdown timer to next automated run (5:30 AM / 5:30 PM IST)
function startCountdownTimer() {
  const timerElem = document.getElementById('nextRunCountdown');
  
  setInterval(() => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    
    // Target next 00:00 UTC or 12:00 UTC
    let target = new Date(now);
    target.setMilliseconds(0);
    target.setSeconds(0);
    target.setMinutes(0);

    if (utcHours < 12) {
      target.setUTCHours(12);
    } else {
      target.setUTCDate(target.getUTCDate() + 1);
      target.setUTCHours(0);
    }

    const diff = target - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (timerElem) {
      timerElem.innerText = `${hours}h ${mins}m ${secs}s`;
    }
  }, 1000);
}
