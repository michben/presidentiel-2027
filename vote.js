// ============================================================
// Urne citoyenne — vote symbolique, non officiel (app.js gère le
// reste du site ; ce fichier est autonome pour rester facile à
// retirer). Backend : dépôt presidentiel-2027-admin (routes /api/vote*).
//
// Anti-doublon (sans compte requis) : le serveur combine un cookie
// opaque avec un hash(IP + empreinte appareil) — voir server.js.
// Côté client, on ne fait que calculer cette empreinte (dérivée de
// caractéristiques stables du navigateur, jamais aléatoire) et
// envoyer les requêtes avec les cookies (credentials: 'include').
// Une adresse MAC ne peut techniquement pas être lue par un site web.
// ============================================================

const VOTE_ALLOWED_STATUTS = new Set(['déclarée', 'pressentie']);

let voteFingerprint = null;
let voteCandidatesCache = [];
let hasVoted = false;

async function sha256Hex(text) {
  if (window.crypto && window.crypto.subtle) {
    try {
      const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (err) { /* repli ci-dessous */ }
  }
  // Repli si SubtleCrypto est indisponible (contexte non sécurisé) :
  // moins robuste, mais le serveur revérifie de toute façon via IP + cookie.
  let hash = 0;
  for (let i = 0; i < text.length; i++) { hash = (hash * 31 + text.charCodeAt(i)) >>> 0; }
  return 'fallback' + hash.toString(16);
}

function canvasFingerprintSeed() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    canvas.width = 220; canvas.height = 30;
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 100, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Présidentielle2027', 2, 2);
    return canvas.toDataURL();
  } catch (err) {
    return '';
  }
}

async function buildDeviceFingerprint() {
  const parts = [
    navigator.userAgent || '',
    navigator.language || '',
    (screen.width || 0) + 'x' + (screen.height || 0),
    screen.colorDepth || 0,
    (Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
    navigator.hardwareConcurrency || 0,
    navigator.platform || '',
    canvasFingerprintSeed()
  ];
  return sha256Hex(parts.join('|'));
}

function renderVoteGrid() {
  const grid = document.getElementById('voteGrid');
  if (!grid) return;
  voteCandidatesCache = getActiveCandidates().filter(c => VOTE_ALLOWED_STATUTS.has(c.statut));
  grid.innerHTML = voteCandidatesCache.map(cand => `
    <button class="vote-candidate-card" data-id="${cand.id}" type="button">
      ${avatarHtml(cand)}
      <div class="cand-info">
        <div class="cand-name">${cand.nom}</div>
        <div class="cand-party">${cand.parti}</div>
      </div>
    </button>`).join('');
  grid.querySelectorAll('.vote-candidate-card').forEach(btn => {
    btn.addEventListener('click', () => castVote(btn.dataset.id));
  });
}

function animateBallot() {
  return new Promise(resolve => {
    const ballot = document.getElementById('voteBallot');
    const urn = document.getElementById('voteUrn');
    if (!ballot || !urn) return resolve();
    ballot.style.transition = 'none';
    ballot.style.transform = 'translateY(0)';
    ballot.setAttribute('opacity', '1');
    void ballot.getBoundingClientRect();
    ballot.style.transition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms ease';
    requestAnimationFrame(() => {
      ballot.style.transform = 'translateY(34px)';
      ballot.setAttribute('opacity', '0.15');
    });
    setTimeout(() => {
      urn.classList.add('vote-urn-shake');
      setTimeout(() => urn.classList.remove('vote-urn-shake'), 260);
      ballot.style.transition = 'none';
      ballot.style.transform = 'translateY(0)';
      ballot.setAttribute('opacity', '0');
      resolve();
    }, 650);
  });
}

async function castVote(candidateId) {
  if (hasVoted) return;
  const grid = document.getElementById('voteGrid');
  const statusText = document.getElementById('voteStatusText');
  grid.querySelectorAll('.vote-candidate-card').forEach(b => b.disabled = true);
  statusText.textContent = 'Envoi de votre bulletin…';

  const wakeupTimer = setTimeout(() => {
    statusText.textContent = 'Le service de vote se réveille (jusqu\'à 30-50s après une période d\'inactivité)…';
  }, 4000);

  try {
    if (!voteFingerprint) voteFingerprint = await buildDeviceFingerprint();
    const animPromise = animateBallot();
    const fetchPromise = fetch(API_BASE + '/api/vote', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId, fingerprint: voteFingerprint })
    });
    const [, res] = await Promise.all([animPromise, fetchPromise]);
    clearTimeout(wakeupTimer);
    const body = await res.json().catch(() => ({}));

    if (res.status === 409 && body.alreadyVoted) {
      hasVoted = true;
      statusText.textContent = 'Vous aviez déjà voté.';
      await showVoteResults(body.candidateId);
      return;
    }
    if (!res.ok) {
      statusText.textContent = body.error || `Erreur (${res.status})`;
      grid.querySelectorAll('.vote-candidate-card').forEach(b => b.disabled = false);
      return;
    }

    hasVoted = true;
    statusText.textContent = 'Merci, votre bulletin a été comptabilisé !';
    await showVoteResults(candidateId, body.results, body.total);
  } catch (err) {
    clearTimeout(wakeupTimer);
    console.error('[vote] échec réseau du vote:', err);
    statusText.textContent = 'Le vote est momentanément indisponible (réseau ou service en veille). Réessayez dans quelques instants.';
    grid.querySelectorAll('.vote-candidate-card').forEach(b => b.disabled = false);
  }
}

async function showVoteResults(chosenId, results, total) {
  const grid = document.getElementById('voteGrid');
  const resultsSection = document.getElementById('voteResults');
  const totalEl = document.getElementById('voteResultsTotal');
  const wrap = document.getElementById('voteResultsWrap');
  if (!grid || !resultsSection || !totalEl || !wrap) return;

  if (!results) {
    try {
      const res = await fetch(API_BASE + '/api/vote/results', { cache: 'no-store' });
      const body = await res.json();
      results = body.results || {};
      total = body.total || 0;
    } catch (err) {
      results = {};
      total = 0;
    }
  }

  grid.hidden = true;
  resultsSection.hidden = false;
  totalEl.textContent = `${total} vote${total > 1 ? 's' : ''} au total`;

  const rows = (voteCandidatesCache.length ? voteCandidatesCache : getActiveCandidates())
    .map(c => ({ cand: c, count: (results && results[c.id]) || 0 }))
    .filter(r => r.count > 0 || VOTE_ALLOWED_STATUTS.has(r.cand.statut))
    .sort((a, b) => b.count - a.count);
  const maxCount = Math.max(1, ...rows.map(r => r.count));

  wrap.innerHTML = rows.map(r => {
    const pct = total > 0 ? Math.round((r.count / total) * 100) : 0;
    const widthPct = Math.round((r.count / maxCount) * 100);
    const isMe = r.cand.id === chosenId;
    return `
      <div class="progress-chart-row${isMe ? ' vote-my-choice' : ''}">
        <div class="progress-chart-label">${r.cand.nom}${isMe ? ' ✓' : ''}</div>
        <div class="progress-chart-track">
          <div class="progress-chart-bar" style="width:${widthPct}%;background:${r.cand.couleur}"></div>
        </div>
        <div class="progress-chart-value">${pct}%</div>
      </div>`;
  }).join('');
}

async function initVoteSection() {
  const section = document.getElementById('voteSection');
  if (!section) return;
  renderVoteGrid();
  try {
    const res = await fetch(API_BASE + '/api/vote/status', { credentials: 'include' });
    const body = await res.json();
    if (body.voted) {
      hasVoted = true;
      document.getElementById('voteStatusText').textContent = 'Vous avez déjà voté. Merci pour votre participation !';
      await showVoteResults(body.candidateId);
    }
  } catch (err) {
    console.warn('[vote] statut indisponible:', err.message);
  }
}

(async function voteBootstrap() {
  await siteDataReady;
  initVoteSection();
})();
