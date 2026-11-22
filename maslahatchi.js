/* Elite Platok — saytdagi chat: ichida Madina (Telegram botdagi AI sotuvchi bilan bir xil miya) javob beradi.
   Xurshid aka 2026-11-23: "saytdagi chat qolsin, ichida Madina javob bersin, eski botni almashtir".
   Server: https://eliteplatok.uz/bot/web/ (msg — xabar yuborish, poll — javoblarni olish). Narx, buyurtma va to'lovni server hisoblaydi.
   index.html dagi PRODUCTS, LANG, S_, openProduct, smP, cart ishlatiladi. index.html ga faqat <script src="maslahatchi.js" defer></script>. */
(() => {
  const $PRODUCTS = () => typeof PRODUCTS !== 'undefined' ? PRODUCTS : null;
  const $LANG = () => typeof LANG !== 'undefined' ? LANG : 'uz';
  const $S_ = () => typeof S_ !== 'undefined' ? S_ : {};
  const $smP = () => typeof smP !== 'undefined' ? smP : null;
  const SS = { get: k => { try { return sessionStorage.getItem('ep-mx-' + k); } catch (e) { return null; } },
               set: (k, v) => { try { sessionStorage.setItem('ep-mx-' + k, v); } catch (e) {} } };
  const LS = { get: k => { try { return localStorage.getItem('ep-ai-' + k); } catch (e) { return null; } },
               set: (k, v) => { try { localStorage.setItem('ep-ai-' + k, v); } catch (e) {} } };
  const goal = g => { try { if (window.ym) ym(+$S_().metrika_id || 114361342, 'reachGoal', 'mx_' + g); } catch (e) {} try { if (window.gtag) gtag('event', 'mx_' + g); } catch (e) {} };
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const T = {
    uz: { help: 'Madina', title: 'Madina', sub: 'Elite Platok maslahatchisi · online', close: 'Yopish',
      hi: 'Assalomu alaykum! Men Madina — Elite Platok maslahatchisiman 🌸',
      hi2: 'Ro‘mol yoki abaya tanlashda yordam beraman: rang, mato, narx, yetkazib berish. Savolingizni yozing.',
      chips: ['Ro‘mol tanlash', 'Abaya', 'Aksiyalar', 'Yetkazib berish'],
      ph: 'Savolingizni yozing…', send: 'Yuborish', open: 'Ko‘rish', ask: 'narxini so‘rang',
      err: 'Xabar yetib bormadi. Internetni tekshirib, qayta yuboring.', busy: 'Hozir juda ko‘p xabar keldi — birozdan keyin yozing yoki menejerga Telegram orqali murojaat qiling.' },
    ru: { help: 'Мадина', title: 'Мадина', sub: 'Консультант Elite Platok · online', close: 'Закрыть',
      hi: 'Здравствуйте! Я Мадина — консультант Elite Platok 🌸',
      hi2: 'Помогу выбрать платок или абаю: цвет, ткань, цена, доставка. Напишите ваш вопрос.',
      chips: ['Подобрать платок', 'Абаи', 'Акции', 'Доставка'],
      ph: 'Напишите ваш вопрос…', send: 'Отправить', open: 'Смотреть', ask: 'цену уточните',
      err: 'Сообщение не отправилось. Проверьте интернет и отправьте ещё раз.', busy: 'Сейчас слишком много сообщений — напишите чуть позже или менеджеру в Telegram.' },
    en: { help: 'Madina', title: 'Madina', sub: 'Elite Platok consultant · online', close: 'Close',
      hi: 'Hello! I’m Madina, Elite Platok’s consultant 🌸',
      hi2: 'I’ll help you choose a scarf or an abaya — colour, fabric, price, delivery. Type your question.',
      chips: ['Choose a scarf', 'Abayas', 'Offers', 'Delivery'],
      ph: 'Type your question…', send: 'Send', open: 'View', ask: 'ask for price',
      err: 'The message wasn’t sent. Check your connection and try again.', busy: 'Too many messages right now — please write a bit later or message our manager on Telegram.' },
  };
  const L = () => T[$LANG()] || T.uz;

  const css = `
  .mx-fab{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:8px;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);border:0;border-radius:999px;padding:11px 16px 11px 12px;font:400 12px/1 var(--sans,system-ui);letter-spacing:.12em;text-transform:uppercase;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.22);transition:.3s}
  .mx-fab i{width:26px;height:26px;border-radius:50%;background:var(--accent,#8c6a4f);display:grid;place-items:center;font-style:normal;font-size:13px;font-family:var(--serif,Georgia);letter-spacing:0;text-transform:none}
  .mx-fab.hid{opacity:0;pointer-events:none;transform:translateY(10px)}
  .mx-fab.new i{box-shadow:0 0 0 3px #e2554f}
  .mx{position:fixed;right:18px;bottom:18px;z-index:61;width:min(370px,calc(100vw - 32px));max-height:min(620px,calc(100vh - 36px));display:flex;flex-direction:column;background:#f6f1eb;color:var(--ink,#2b2622);box-shadow:0 24px 60px rgba(0,0,0,.28);border-radius:18px;overflow:hidden;font-family:var(--sans,system-ui);font-weight:300;opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:.32s cubic-bezier(.2,.8,.2,1)}
  .mx.on{opacity:1;transform:none;pointer-events:auto}
  .mx-h{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;border-bottom:1px solid var(--line,#d1c6b9);background:var(--bg,#e9e2d9);flex:none}
  .mx-av{width:34px;height:34px;border-radius:50%;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);display:grid;place-items:center;font-family:var(--serif,Georgia);font-size:16px;letter-spacing:.05em;position:relative;flex:none}
  .mx-av:after{content:"";position:absolute;right:0;bottom:0;width:9px;height:9px;border-radius:50%;background:#4caf6a;border:2px solid var(--bg,#e9e2d9)}
  .mx-h b{font-weight:500;font-size:13px;display:block}.mx-h small{font-size:11px;color:var(--muted,#73685e)}
  .mx-x{margin-left:auto;background:none;border:0;font-size:22px;line-height:1;color:var(--muted,#73685e);cursor:pointer;padding:4px 6px}
  .mx-b{overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth;flex:1;min-height:160px}
  .mx-m{align-self:flex-start;max-width:88%;background:#fff;border-radius:14px 14px 14px 4px;padding:10px 13px;font-size:14px;line-height:1.45;animation:mxIn .3s both;overflow-wrap:anywhere}
  .mx-m.me{align-self:flex-end;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);border-radius:14px 14px 4px 14px}
  .mx-o{display:flex;flex-wrap:wrap;gap:6px;padding:2px 0 6px;animation:mxIn .3s .1s both}
  .mx-o button,.mx-o a{border:1px solid var(--ink,#2b2622);background:transparent;color:var(--ink,#2b2622);border-radius:999px;padding:8px 13px;font:400 13px/1.2 var(--sans,system-ui);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
  .mx-o button:hover,.mx-o a:hover{background:var(--ink,#2b2622);color:var(--bg,#e9e2d9)}
  .mx-o .solid{background:var(--ink,#2b2622);color:var(--bg,#e9e2d9)}
  .mx-o a.off{opacity:.4;pointer-events:none}
  .mx-c{display:grid;grid-template-columns:76px 1fr;gap:11px;background:#fff;border-radius:14px;padding:8px;animation:mxIn .35s both;cursor:pointer}
  .mx-c img{width:76px;height:101px;object-fit:cover;border-radius:9px;background:#eee}
  .mx-c h4{font:500 13px/1.3 var(--sans,system-ui);margin:2px 0 3px}
  .mx-c .pr{font-size:13px;margin-bottom:5px}.mx-c .pr s{color:var(--muted,#73685e);font-size:12px}
  .mx-c .pr .nt{display:block;font-size:11px;color:var(--muted,#73685e);margin-top:2px}
  .mx-c .acts button{border:1px solid var(--ink,#2b2622);background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);border-radius:999px;padding:5px 12px;font:400 11px/1.2 var(--sans,system-ui);cursor:pointer}
  .mx-f{display:flex;gap:8px;align-items:center;padding:10px 12px;border-top:1px solid var(--line,#d1c6b9);background:#fff;flex:none}
  .mx-f input{flex:1;min-width:0;border:1px solid var(--line,#d1c6b9);border-radius:999px;padding:10px 14px;font:400 16px/1.25 var(--sans,system-ui);background:#f6f1eb;color:var(--ink,#2b2622);outline:none}
  .mx-f input:focus{border-color:var(--ink,#2b2622)}
  .mx-f button{width:40px;height:40px;flex:none;border-radius:50%;border:0;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);cursor:pointer;display:grid;place-items:center}
  .mx-f button svg{width:18px;height:18px}.mx-f button:disabled{opacity:.45;cursor:default}
  .mx-f .hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
  .mx-m.mx-ty{display:flex;gap:5px;padding:13px 14px}.mx-ty i{width:7px;height:7px;border-radius:50%;background:var(--muted,#73685e);opacity:.35;animation:mxTy 1.1s infinite}
  .mx-ty i:nth-child(2){animation-delay:.18s}.mx-ty i:nth-child(3){animation-delay:.36s}
  @keyframes mxTy{0%,60%,100%{opacity:.25;transform:none}30%{opacity:.9;transform:translateY(-3px)}}
  @keyframes mxIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @media (max-width:900px){.mx-fab{bottom:84px;right:14px;padding:10px 12px}.mx-fab span{display:none}.mx{right:12px;left:12px;width:auto;bottom:12px;max-height:calc(100vh - 90px)}}
  `;

  const API = '/bot/web/';
  const AI = { t: /^[a-f0-9]{40}$/.test(LS.get('t') || '') ? LS.get('t') : '', after: 0, seen: new Set(), polling: false, typing: false, tyEl: null,
               act: 0, sending: false, wait: 0, loadAt: Date.now() };

  let box, body, fab;
  function build() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    fab = document.createElement('button'); fab.className = 'mx-fab hid'; fab.type = 'button';
    document.body.appendChild(fab);
    box = document.createElement('div'); box.className = 'mx'; box.setAttribute('role', 'dialog');
    document.body.appendChild(box);
    fab.onclick = () => { goal('open'); open(); if (!body.children.length) greet(); };
    paint();
  }
  function paint() {
    const t = L();
    fab.innerHTML = `<i>M</i><span>${E(t.help)}</span>`; fab.setAttribute('aria-label', t.help);
    box.setAttribute('aria-label', t.title);
    const keep = body ? body.innerHTML : '';
    box.innerHTML = `<div class="mx-h"><div class="mx-av">M</div><div><b>${E(t.title)}</b><small>${E(t.sub)}</small></div><button class="mx-x" aria-label="${E(t.close)}">×</button></div><div class="mx-b"></div>`
      + `<form class="mx-f" autocomplete="off"><input type="text" maxlength="1500" enterkeyhint="send" placeholder="${E(t.ph)}" aria-label="${E(t.ph)}"><input class="hp" name="website" tabindex="-1" aria-hidden="true"><button type="submit" aria-label="${E(t.send)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>`;
    body = box.querySelector('.mx-b'); body.innerHTML = keep; AI.tyEl = body.querySelector('.mx-ty');
    body.querySelectorAll('.mx-o[data-chips]').forEach(d => d.remove());       // til almashganda eski tezkor tugmalar olib tashlanadi
    box.querySelector('.mx-x').onclick = close;
    const f = box.querySelector('.mx-f');
    f.onsubmit = e => { e.preventDefault(); const inp = f.querySelector('input'); if (f.querySelector('.hp').value) return; send(inp.value, inp); };
  }
  const isOpen = () => box.classList.contains('on');
  function open() { box.classList.add('on'); fab.classList.add('hid'); fab.classList.remove('new'); if (AI.t) poll(); }
  function close() { box.classList.remove('on'); fab.classList.remove('hid'); SS.set('closed', '1'); }
  const scroll = () => requestAnimationFrame(() => body.scrollTop = body.scrollHeight);
  function say(html, me) { const d = document.createElement('div'); d.className = 'mx-m' + (me ? ' me' : ''); d.innerHTML = html; body.appendChild(d); scroll(); return d; }
  function opts(list) {
    const d = document.createElement('div'); d.className = 'mx-o';
    list.forEach(o => {
      const b = document.createElement(o.href ? 'a' : 'button');
      if (o.href) { b.href = o.href; b.target = '_blank'; b.rel = 'noopener'; } else b.type = 'button';
      if (o.cls) b.className = o.cls;
      b.textContent = o.label;
      b.onclick = () => o.go && o.go();
      d.appendChild(b);
    });
    body.appendChild(d); scroll(); return d;
  }

  // Madinaning salomi (saytning o'zida chiqadi — server buni biladi va qayta salomlashmaydi) va tezkor savollar.
  function greet() {
    const t = L();
    say(`<b>${E(t.hi)}</b><br>${E(t.hi2)}`);
    const d = opts(t.chips.map(c => ({ label: c, go: () => send(c) })));
    d.dataset.chips = '1';
  }

  function ctx() {
    const P = $PRODUCTS() || [], o = {};
    if (document.getElementById('pm')?.classList.contains('open')) { const s = decodeURIComponent(location.hash.slice(1).split('/')[0] || ''); if (s) o.view = s; }
    try {
      const c = typeof cart !== 'undefined' && Array.isArray(cart) ? cart : [];
      o.cart = c.slice(0, 10).map(x => { const p = P.find(q => q.slug === x.slug), v = p && p.vars[x.v | 0]; return { id: x.slug, v: v ? (v.name_uz || v.name) : '', qty: x.qty }; });
    } catch (e) {}
    return o;
  }
  const src = () => { const u = new URLSearchParams(location.search).get('utm_source') || ''; return 'sayt' + (u ? '_' + u.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40) : ''); };
  function typing(on) {
    if (AI.tyEl) { AI.tyEl.remove(); AI.tyEl = null; }
    if (on) { AI.tyEl = document.createElement('div'); AI.tyEl.className = 'mx-m mx-ty'; AI.tyEl.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(AI.tyEl); scroll(); }
  }

  async function send(text, inp) {
    text = String(text || '').trim(); if (!text || AI.sending) return;
    const btn = box.querySelector('.mx-f button');
    AI.sending = true; btn.disabled = true;
    body.querySelectorAll('.mx-o[data-chips]').forEach(d => d.remove());
    say(E(text), true); if (inp) inp.value = '';
    goal(AI.t ? 'ai_msg' : 'ai_start'); AI.act = Date.now();
    let ok = false;
    try {
      const r = await fetch(API + 'msg', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: AI.t || undefined, text, lang: $LANG(), ctx: ctx(), src: src(), greeted: true }) });
      const j = await r.json().catch(() => ({}));
      if (j.t) { AI.t = j.t; LS.set('t', j.t); }
      if (j.id) AI.seen.add(j.id);
      if (j.ok) ok = true; else say(E(j.error === 'busy' ? L().busy : L().err));
    } catch (e) { say(E(L().err)); }
    AI.sending = false; btn.disabled = false;
    if (ok) { AI.wait = Date.now() + 9000; typing(true); poll(); }
  }

  const thumb = (p, k) => { const v = p.vars[k], s = v && v.ims && v.ims[0]; return s ? E($smP() ? $smP()(s) : s) : ''; };
  function card(it) {
    const P = $PRODUCTS() || [], i = P.findIndex(p => p.slug === it.id), p = P[i];
    let k = p && it.v ? p.vars.findIndex(v => v.name === it.v || v.name_uz === it.v) : 0; if (k < 0) k = 0;
    const img = (p && thumb(p, k)) || E(it.img || '');
    const pr = it.price || {};
    const c = document.createElement('div'); c.className = 'mx-c';
    c.innerHTML = `<img src="${img}" alt="" loading="lazy"><div><h4>${E(it.name)}${it.vname ? ` — <span style="font-weight:300">${E(it.vname)}</span>` : ''}</h4>`
      + `<div class="pr">${pr.now ? E(pr.now) : `<i>${E(L().ask)}</i>`}${pr.old ? ` <s>${E(pr.old)}</s>` : ''}${pr.note ? `<span class="nt">${E(pr.note)}</span>` : ''}</div>`
      + (i >= 0 ? `<div class="acts"><button type="button">${E(L().open)}</button></div>` : '') + '</div>';
    if (i >= 0) c.onclick = () => { goal('ai_view'); window.openProduct && openProduct(i, true, k); box.classList.remove('on'); fab.classList.remove('hid'); };
    body.appendChild(c);
  }
  function render(ev) {
    if (ev.id > AI.after) AI.after = ev.id;
    if (AI.seen.has(ev.id)) return;
    AI.seen.add(ev.id); AI.act = Date.now(); if (ev.type !== 'me') AI.wait = 0;
    const ty = !!AI.tyEl; if (ty) typing(false);
    if (ev.type === 'me') say(E(ev.text), true);
    else if (ev.type === 'text') {
      say(E(ev.text).replace(/\n/g, '<br>'));
      if (ev.buttons && ev.buttons.length) {
        const d = opts(ev.buttons.map(b => ({ label: b.text, href: b.url, cls: 'solid', go: () => goal('ai_pay') })));
        d.querySelectorAll('a').forEach(a => { a.dataset.ref = ev.id; });
      }
      if (!isOpen() && ev.at > AI.loadAt) fab.classList.add('new');
    } else if (ev.type === 'products') (ev.items || []).forEach(card);
    else if (ev.type === 'expire') body.querySelectorAll(`a[data-ref="${+ev.ref}"]`).forEach(a => { a.classList.add('off'); a.removeAttribute('href'); });
    if (ty && ev.type === 'me') typing(true);
    scroll();
  }
  async function poll() {
    if (AI.polling || !AI.t) return;
    AI.polling = true;
    try {
      while (AI.t && document.visibilityState !== 'hidden' && Date.now() - AI.act < 20 * 60_000) {
        let j = null;
        try {
          const r = await fetch(`${API}poll?t=${AI.t}&after=${AI.after}&ty=${AI.typing ? 1 : 0}`, { cache: 'no-store' });
          if (r.status === 404) { AI.t = ''; LS.set('t', ''); break; }
          if (r.ok) j = await r.json();
        } catch (e) {}
        if (!j) { await sleep(6000); continue; }
        (j.events || []).forEach(render);
        AI.typing = !!j.typing;
        const on = AI.typing || Date.now() < (AI.wait || 0);
        if (on !== !!AI.tyEl || on) typing(on);
      }
    } finally { AI.polling = false; }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && AI.t && (isOpen() || Date.now() - AI.act < 20 * 60_000)) poll(); });

  /* --- ishga tushish --- */
  const t0 = Date.now();
  function init() {
    if (!$PRODUCTS() || !$PRODUCTS().length) return setTimeout(init, 400);
    build();
    let lang = $LANG(); setInterval(() => { if ($LANG() !== lang) { lang = $LANG(); paint(); } }, 800);   // til almashsa matnlar yangilanadi
    fab.classList.remove('hid');
    if (AI.t) {                                      // avval yozishgan bo'lsa — yozishma tiklanadi; to'lovdan qaytganda (?chat=1) chat o'zi ochiladi
      AI.act = Date.now();
      if (/[?&]chat=/.test(location.search)) { open(); history.replaceState(history.state, '', location.pathname + location.search.replace(/[?&]chat=[^&]*/, '').replace(/^&/, '?') + location.hash); }
      else poll();
      return;
    }
    // Madina 18 soniyadan keyin bir marta o'zi salom beradi (bir tashrifda bir marta, mahsulot/savat oynasi ochiq bo'lmasa)
    const busy = () => document.getElementById('pm')?.classList.contains('open') || document.getElementById('drawer')?.classList.contains('on') || document.getElementById('srch')?.classList.contains('open');
    const auto = () => { if (SS.get('greeted') || SS.get('closed') || AI.t || isOpen()) return; if (busy()) return setTimeout(auto, 4000); SS.set('greeted', '1'); goal('greet'); if (!body.children.length) greet(); open(); };
    setTimeout(auto, Math.max(0, 18000 - (Date.now() - t0)));
  }
  if (location.search.includes('mx=0')) return;
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
