/* ===========================================================
   Is This Real?  ::  game engine
   Static. No backend. Nothing is stored or sent anywhere.
   =========================================================== */

const screen = document.getElementById('screen');
const hud    = document.getElementById('hud');

let C     = null;   // content (loaded from content.<country>.json)
let state = null;

/* The game is always in English. Choosing a country swaps the names,
   places, institutions and currency for ones the player recognises. */
const COUNTRIES = [
  { code: 'lk', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'mm', flag: '🇲🇲', name: 'Myanmar'   },
  { code: 'id', flag: '🇮🇩', name: 'Indonesia' }
];

/* ---------- boot ---------- */

function boot() {
  const pre = new URLSearchParams(location.search).get('c');
  if (COUNTRIES.some(c => c.code === pre)) return load(pre);
  landing();
}

function landing() {
  hud.hidden = true;
  clear();

  const pane = add(el(`
    <div class="pane landing">
      <div class="wordmark">
        <h1>Is This<br>Real?</h1>
      </div>

      <p class="lead">Your grandmother forwards you a message
         and asks if it's real.</p>
      <p class="tag">Believing the lie loses.<br>
         Refusing to believe the truth loses too.</p>

      <div class="pick">
        <p class="pick-q">Where are you?</p>
        <div class="stack" id="countries"></div>
        <p class="privacy">The game is in English. Your country changes the
           messages, names and places to ones you'll recognise.</p>
      </div>
    </div>`));

  const list = pane.querySelector('#countries');
  COUNTRIES.forEach(c => {
    const b = el(`<button class="country">
                    <span class="flag">${c.flag}</span>${c.name}
                  </button>`);
    b.onclick = () => load(c.code);
    list.appendChild(b);
  });
}

async function load(code) {
  clear();
  add(el(`<div class="pane"><p class="lead">Loading…</p></div>`));

  let text;
  try {
    const res = await fetch(`content.${code}.json`);
    if (!res.ok) throw new Error('missing');
    text = await res.text();
  } catch (e) {
    return showLoadError(code, 'missing');
  }

  try {
    C = JSON.parse(text);
  } catch (e) {
    return showLoadError(code, 'broken', e.message);
  }

  reset();
  next();
}

/* Two very different problems, so two very different messages.
   "broken" is the one a teammate hits after editing the file. */
function showLoadError(code, why, detail) {
  clear();
  const file = `content.${code}.json`;

  const body = why === 'broken'
    ? `<h2>That file has a typo in it</h2>
       <p><code>${file}</code> loaded, but it is not valid JSON any more.
          Usually this is a missing comma, a missing <code>"</code>, or a
          stray comma before a <code>}</code>.</p>
       <div class="err">
         What the browser says:
         <code>${detail || 'Unexpected token'}</code>
       </div>
       <p class="privacy">Tip: paste the file into
          <b>jsonlint.com</b> and it will point at the exact line.</p>`
    : `<h2>Couldn't load the game</h2>
       <p>The browser could not read <code>${file}</code>. Either the file
          is missing, or you opened <code>index.html</code> directly instead
          of serving it.</p>
       <div class="err">
         From this folder, run:
         <code>python -m http.server 8123</code>
         then open http://localhost:8123
       </div>`;

  add(el(`<div class="pane left">${body}
      <div class="stack"><button class="ghost" onclick="landing()">Back</button></div>
    </div>`));
}

/* ---------- state ---------- */

function reset() {
  state = {
    round: 0,
    safe: C.meta.meters.safe,
    confident: C.meta.meters.confident,
    checks: C.meta.checksAllowed,
    actShown: {},
    log: []
  };
}

const MAX = () => C.meta.meters.max;

function clamp(n) { return Math.max(0, Math.min(MAX(), n)); }

/* ---------- HUD ---------- */

function drawHud() {
  hud.hidden = false;
  const s = document.getElementById('bar-safe');
  const c = document.getElementById('bar-confident');
  s.style.width = (state.safe / MAX() * 100) + '%';
  c.style.width = (state.confident / MAX() * 100) + '%';
  s.classList.toggle('low', state.safe <= 1);
  c.classList.toggle('low', state.confident <= 1);
  document.getElementById('checks').textContent = '🔍 ' + state.checks;
}

/* ---------- tiny helpers ---------- */

const wait = ms => new Promise(r => setTimeout(r, ms));

function el(html) {
  const d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.firstElementChild;
}

function add(node) {
  screen.appendChild(node);
  node.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return node;
}

function clear() { screen.innerHTML = ''; }

async function typing(ms = 900) {
  const t = add(el(`<div class="typing"><span></span><span></span><span></span></div>`));
  await wait(ms);
  t.remove();
}

/* ---------- screens ---------- */

function replay() { reset(); next(); }

async function actIntro(act) {
  clear();
  hud.hidden = false;
  add(el(`
    <div class="pane">
      <p class="lead">${act.intro}</p>
      <div class="stack"><button class="primary" id="go">Continue</button></div>
    </div>`));
  document.getElementById('go').onclick = () => renderRound();
}

/* ---------- main loop ---------- */

function next() {
  const r = C.rounds[state.round];
  if (!r) return ending();

  const act = C.acts.find(a => a.id === r.act);
  if (act && act.intro && !state.actShown[act.id]) {
    state.actShown[act.id] = true;
    return actIntro(act);
  }
  renderRound();
}

async function renderRound() {
  const r = C.rounds[state.round];
  clear();
  drawHud();

  if (r.type === 'ending') return ending();

  // the incoming message
  if (r.message !== null) {
    let inner;
    if (r.type === 'voice') {
      inner = `<div class="voice">
                 <div class="play">▶</div><div class="wave"></div>
               </div>
               <div class="fwd-tag">${r.messageNote || ''}</div>
               <div style="font-style:italic">“${r.message}”</div>`;
    } else {
      inner = `${r.messageNote ? `<div class="fwd-tag">${r.messageNote}</div>` : ''}
               <div class="fwd">${r.message}</div>`;
    }

    const mine = r.type === 'outgoing';
    add(el(`<div class="bubble ${mine ? 'me' : ''}">
              ${mine ? '' : '<div class="fwd-tag">Forwarded</div>'}
              ${inner}
            </div>`));
    await wait(500);
  }

  // her line
  await typing();
  add(el(`<div><p class="who">${C.meta.she}</p>
            <div class="bubble">${r.prompt}</div></div>`));

  await wait(250);
  showChoices(r);
}

function showChoices(r) {
  const box = add(el(`<div class="choices"></div>`));

  r.choices.forEach((ch, i) => {
    const spent = ch.usesCheck && state.checks <= 0;
    const b = el(`
      <button class="choice" ${spent ? 'disabled' : ''}>
        ${ch.text}
        ${ch.usesCheck ? `<span class="cost">🔍 uses one check${spent ? ' (none left)' : ''}</span>` : ''}
      </button>`);
    b.onclick = () => choose(r, ch, box);
    box.appendChild(b);
  });
}

async function choose(r, ch, box) {
  box.remove();

  add(el(`<div class="bubble me">${ch.text}</div>`));

  if (ch.usesCheck) state.checks--;
  state.safe      = clamp(state.safe + (ch.safe || 0));
  state.confident = clamp(state.confident + (ch.confident || 0));

  // remember it, so the ending can play it back from her side
  if (ch.heard) {
    state.log.push({ said: ch.text, heard: ch.heard,
                     weight: Math.abs(ch.confident || 0) });
  }
  drawHud();

  await wait(400);
  await typing(1100);

  add(el(`<div class="outcome">${ch.outcome}</div>`));

  if (r.why) {
    await wait(500);
    add(el(`<div class="why"><b>Why</b>${r.why}</div>`));
  }

  await wait(300);

  // early loss
  if (state.safe <= 0 || state.confident <= 0) {
    const btn = add(el(`<div class="stack"><button class="primary">See what happened</button></div>`));
    btn.querySelector('button').onclick = ending;
    return;
  }

  const btn = add(el(`<div class="stack"><button class="primary">Next</button></div>`));
  btn.querySelector('button').onclick = () => { state.round++; next(); };
}

/* ---------- ending ---------- */

function pickEnding() {
  const hiSafe = state.safe >= 3;
  const hiConf = state.confident >= 3;
  if (hiSafe && hiConf)  return byId('still_asking');
  if (hiSafe && !hiConf) return byId('safe_and_alone');
  if (!hiSafe && hiConf) return byId('trusted_completely');
  return byId('neither');
}

const byId = id => C.endings.find(e => e.id === id);

async function ending() {
  clear();
  drawHud();

  const last = C.rounds[C.rounds.length - 1];

  if (last.beat) {
    add(el(`<div class="beat">${last.beat}</div>`));
    await wait(1600);
  }

  await typing(900);
  add(el(`<div><p class="who">${C.meta.she}</p>
            <div class="bubble">${last.prompt}</div></div>`));

  await wait(1600);

  const e = pickEnding();
  add(el(`
    <div class="pane left">
      <h2>${e.title}</h2>
      <p class="lead">${e.body}</p>
      <div class="stack"><button class="primary" id="on">Continue</button></div>
    </div>`));
  document.getElementById('on').onclick = () => heardScreen(e);
}

/* Plays the player's own choices back from her side.
   Picks the three that moved her confidence most, in the order they happened. */
function heardScreen(e) {
  clear();
  hud.hidden = true;

  const picks = state.log
    .map((x, i) => ({ ...x, i }))
    .sort((a, b) => b.weight - a.weight || a.i - b.i)
    .slice(0, 3)
    .sort((a, b) => a.i - b.i);

  if (!picks.length) return finish(e);

  const pane = add(el(`
    <div class="pane left">
      <p class="pick-q">${C.final.heardTitle}</p>
      <div class="heard-list"></div>
      <div class="stack"><button class="primary" id="on2">Continue</button></div>
    </div>`));

  const list = pane.querySelector('.heard-list');
  picks.forEach((p, n) => {
    const row = el(`
      <div class="heard" style="animation-delay:${n * .45}s">
        <p class="said">You said: “${p.said}”</p>
        <p class="hrd">She heard: <b>“${p.heard}”</b></p>
      </div>`);
    list.appendChild(row);
  });

  document.getElementById('on2').onclick = () => finish(e);
}

function finish(e) {
  clear();
  hud.hidden = true;
  add(el(`
    <div class="pane">
      <p class="lead">${C.final.lead}</p>
      <p class="cta">${C.final.cta}</p>
      <div class="stack">
        <button class="primary" id="again">${C.final.buttons[0]}</button>
        <button class="ghost"   id="with">${C.final.buttons[1]}</button>
        <button class="ghost"   id="share">${C.final.buttons[2]}</button>
      </div>
      <p class="privacy">This game asks you for nothing and stores nothing.</p>
    </div>`));

  document.getElementById('again').onclick = replay;
  document.getElementById('with').onclick  = replay;
  document.getElementById('share').onclick = () => share(e);
}

async function share(e) {
  const text = `I played "Is This Real?" and got: ${e.title}. `
             + `Both trusting too much and doubting too much will cost you.`;
  try {
    if (navigator.share) await navigator.share({ text, url: location.href });
    else {
      await navigator.clipboard.writeText(text + ' ' + location.href);
      document.getElementById('share').textContent = 'Copied ✓';
    }
  } catch (_) { /* user cancelled */ }
}

boot();
