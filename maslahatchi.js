/* Elite Platok — onlayn maslahatchi (sotuvchi shpargalkasi asosida).
   index.html dagi PRODUCTS, LANG, S_, openProduct, cartAdd, openCart, toast, fmt, smP, priceNum ishlatiladi.
   Mustaqil fayl: index.html ga faqat <script src="maslahatchi.js" defer></script> qo'shiladi. */
(() => {
  const $PRODUCTS = () => typeof PRODUCTS !== 'undefined' ? PRODUCTS : null;
  const $LANG = () => typeof LANG !== 'undefined' ? LANG : 'uz';
  const $S_ = () => typeof S_ !== 'undefined' ? S_ : {};
  const $smP = () => typeof smP !== 'undefined' ? smP : null;
  const $fmt = () => typeof fmt !== 'undefined' ? fmt : null;
  const $priceNum = () => typeof priceNum !== 'undefined' ? priceNum : null;
  const SS = { get: k => { try { return sessionStorage.getItem('ep-mx-' + k); } catch (e) { return null; } },
               set: (k, v) => { try { sessionStorage.setItem('ep-mx-' + k, v); } catch (e) {} } };
  const goal = g => { try { if (window.ym) ym(+$S_().metrika_id || 114361342, 'reachGoal', 'mx_' + g); } catch (e) {} try { if (window.gtag) gtag('event', 'mx_' + g); } catch (e) {} };
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const T = {
    uz: {
      origin: 'Qayerdan keladi?',
      originA: '🇨🇳 Bu ro‘mollarimiz Xitoyning Chjeszyan provinsiyasidagi Shaosin (Shaoxing) to‘qimachilik hududidan keladi — bu Xitoyning eng yirik mato ishlab chiqarish va savdo markazlaridan biri. Ayniqsa uning Keszyao (Keqiao) tumani mato va printlari bilan mashhur: to‘qish, bo‘yash, print tushirish va yakuniy ishlov shu yerda zamonaviy texnologiyalar bilan bajariladi.',
      originB: 'Biz ro‘molni faqat kelib chiqishiga qarab emas — matosi, teksturasi, rangi, chetlari ishlovi va ko‘rinishiga qarab tanlaymiz. Shuning uchun har bir did va byudjetga mos modellar bor. 🤍',
      pick: 'Ro‘mol tanlash',
      hi: 'Assalomu alaykum, xush kelibsiz! 👋', hi2: 'Ro‘mol tanlashda yordam beraymi? Bir necha savol — va sizga mos modellarni ko‘rsataman.',
      yes: 'Ha, yordam bering', no: 'Rahmat, o‘zim ko‘raman', help: 'Maslahatchi', expert: 'Elite Platok maslahatchisi',
      q1: 'O‘zingiz uchun tanlayapsizmi?', self: 'O‘zim uchun', gift: 'Sovg‘aga',
      q2: 'Kundalik uchunmi yoki alohida obraz uchun?', daily: 'Kundalik', special: 'Bayram, tadbir',
      q3: 'Qanday ranglar ko‘proq kiyasiz? Moslarini ko‘rsataman.', dark: 'To‘q ranglar', light: 'Och, pastel', bright: 'Yorqin', any: 'Farqi yo‘q',
      q4: 'Qanday mato yoqadi?', grip: 'Sirpanmaydigan', airy: 'Yengil, havodor',
      q5: 'Qaysi narx oralig‘ida ko‘raylik?', p1: '100 000 gacha', p2: '100 000 – 250 000', p3: '250 000 dan yuqori',
      res: 'Sizga mos variantlar:', none: 'Aynan shu talablarga mos model hozir yo‘q, lekin bularga qarang:',
      more: 'Boshqa variantlar', restart: 'Qaytadan', take: 'Shu rangni olamiz', open: 'Ko‘rish', otherColors: 'Boshqa ranglari',
      added: 'Ajoyib tanlov! ✨', up: (n, t) => `Shu modeldan yana bitta universal rang qo‘shsak — ${n} tasi ${t} so‘m. Obrazlaringiz uchun tanlov ko‘proq bo‘ladi:`,
      up0: 'Shu rangga yana bitta universal rang juda mos tushadi:', which: 'Qaysi rangini olamiz?',
      calc: 'Hisoblab beraymi?', tg: 'Menejerga yozish', tgMsg: 'Assalomu alaykum! Saytdagi maslahatchi orqali tanladim:',
      r_daily: 'Kundalik kiyimingizga mos.', r_special: 'Bayram obrazingizga nafislik qo‘shadi.', r_grip: 'Sirpanmaydi — kun bo‘yi joyida turadi.',
      r_airy: 'Yengil mato, havo o‘tkazadi.', r_gift: 'Sovg‘a uchun ham juda chiroyli.', r_new: 'Yangi kolleksiyadan.', r_promo: (n, t) => `${n} tasi — ${t} so‘m.`,
      bye: 'Ketishdan oldin — sizga mos yana bitta model bor 👀', bye2: 'Keyingi safar kelganingizda yangi kolleksiyalarimizni ham ko‘ring.',
      ig: 'Instagram’da yangi modellar', look: 'Ko‘rib chiqish', sum: 'so‘m', close: 'Yopish', ask: 'narxini so‘rang'
    },
    ru: {
      origin: 'Откуда?',
      originA: '🇨🇳 Эти платки приезжают из текстильного района Шаосин (Shaoxing) в провинции Чжэцзян — одного из крупнейших центров производства и торговли тканями в Китае. Особенно известен его район Кэцяо (Keqiao): ткачество, окраска, нанесение принта и финальная обработка ткани делаются здесь на современном оборудовании.',
      originB: 'Мы выбираем платки не по происхождению, а по ткани, текстуре, цвету, обработке краёв и внешнему виду. Поэтому у нас есть модели на любой вкус и бюджет. 🤍',
      pick: 'Подобрать платок',
      hi: 'Здравствуйте, добро пожаловать! 👋', hi2: 'Помочь выбрать платок? Пара вопросов — и я покажу подходящие модели.',
      yes: 'Да, помогите', no: 'Спасибо, сама посмотрю', help: 'Консультант', expert: 'Консультант Elite Platok',
      q1: 'Выбираете для себя?', self: 'Для себя', gift: 'В подарок',
      q2: 'На каждый день или для особого образа?', daily: 'На каждый день', special: 'Праздник, мероприятие',
      q3: 'Какие цвета вы носите чаще? Покажу подходящие.', dark: 'Тёмные', light: 'Светлые, пастель', bright: 'Яркие', any: 'Без разницы',
      q4: 'Какая ткань нравится?', grip: 'Не скользит', airy: 'Лёгкая, воздушная',
      q5: 'В каком ценовом диапазоне посмотрим?', p1: 'до 100 000', p2: '100 000 – 250 000', p3: 'от 250 000',
      res: 'Вам подойдут:', none: 'Точно под эти пожелания модели сейчас нет, но посмотрите эти:',
      more: 'Другие варианты', restart: 'Заново', take: 'Беру этот цвет', open: 'Смотреть', otherColors: 'Другие цвета',
      added: 'Отличный выбор! ✨', up: (n, t) => `Добавим ещё один универсальный цвет этой модели — ${n} шт. за ${t} сум. Больше вариантов для ваших образов:`,
      up0: 'К этому цвету отлично подойдёт ещё один универсальный:', which: 'Какой цвет берём?',
      calc: 'Посчитать заказ?', tg: 'Написать менеджеру', tgMsg: 'Здравствуйте! Выбрала через консультанта на сайте:',
      r_daily: 'Подходит к повседневному гардеробу.', r_special: 'Добавит изящества праздничному образу.', r_grip: 'Не скользит — держится весь день.',
      r_airy: 'Лёгкая ткань, дышит.', r_gift: 'Прекрасный подарок.', r_new: 'Из новой коллекции.', r_promo: (n, t) => `${n} шт. — ${t} сум.`,
      bye: 'Перед уходом — есть ещё одна модель для вас 👀', bye2: 'В следующий раз загляните и в наши новые коллекции.',
      ig: 'Новинки в Instagram', look: 'Посмотреть', sum: 'сум', close: 'Закрыть', ask: 'цена по запросу'
    },
    en: {
      origin: 'Where is it from?',
      originA: '🇨🇳 These scarves come from the Shaoxing textile region in Zhejiang province — one of China’s largest fabric production and trading hubs. Its Keqiao district is especially known for fabrics and prints: weaving, dyeing, printing and finishing are all done there with modern technology.',
      originB: 'We choose each scarf not by origin but by its fabric, texture, colour, edge finishing and look — so there are models for every taste and budget. 🤍',
      pick: 'Help me choose',
      hi: 'Hello and welcome! 👋', hi2: 'Can I help you choose a scarf? A few quick questions and I’ll show you the right models.',
      yes: 'Yes, please', no: 'Thanks, I’ll browse', help: 'Stylist', expert: 'Elite Platok stylist',
      q1: 'Are you choosing for yourself?', self: 'For me', gift: 'As a gift',
      q2: 'For everyday or for a special look?', daily: 'Everyday', special: 'Celebration, event',
      q3: 'Which colours do you wear most? I’ll show matching ones.', dark: 'Dark', light: 'Light, pastel', bright: 'Bright', any: 'Any',
      q4: 'Which fabric do you prefer?', grip: 'Non-slip', airy: 'Light, airy',
      q5: 'Which price range shall we look at?', p1: 'up to 100,000', p2: '100,000 – 250,000', p3: 'over 250,000',
      res: 'These will suit you:', none: 'Nothing matches exactly right now, but take a look at these:',
      more: 'More options', restart: 'Start over', take: 'I’ll take this colour', open: 'View', otherColors: 'Other colours',
      added: 'Great choice! ✨', up: (n, t) => `Add one more versatile colour of this model — ${n} for ${t} UZS. More options for your outfits:`,
      up0: 'One more versatile colour goes beautifully with it:', which: 'Which colour shall we take?',
      calc: 'Shall I total it up?', tg: 'Message the manager', tgMsg: 'Hello! I chose with the website stylist:',
      r_daily: 'Fits your everyday wardrobe.', r_special: 'Adds elegance to a festive look.', r_grip: 'Non-slip — stays in place all day.',
      r_airy: 'Light, breathable fabric.', r_gift: 'A lovely gift.', r_new: 'From the new collection.', r_promo: (n, t) => `${n} for ${t} UZS.`,
      bye: 'Before you go — there’s one more model for you 👀', bye2: 'Next time, check out our new collections too.',
      ig: 'New arrivals on Instagram', look: 'Take a look', sum: 'UZS', close: 'Close', ask: 'price on request'
    }
  };
  const L = () => T[$LANG()] || T.uz;

  /* --- colour tone of a variant hex --- */
  function tone(hex) {
    const m = String(hex || '').match(/^#?([0-9a-f]{6})$/i); if (!m) return '';
    const n = parseInt(m[1], 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, s = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
    if (l < .33) return 'dark';
    if (s > .55 && l < .72) return 'bright';
    if (l > .62) return 'light';
    return s > .4 ? 'bright' : 'mid';
  }
  const NEUTRAL = /(bej|qora|oq|krem|sut|kulrang|jigarrang|to‘q ko‘k|beige|black|white|grey|brown)/i;
  const nm = p => String(p.name_uz || p.name || '').toLowerCase();
  const mat = p => [p.name_uz || p.name, p.material_uz || p.material].join(' ').toLowerCase();
  const GRIP = /(jatka|paxta|kashka|trikotaj|sherst|jun|tvil|kashemir)/, AIRY = /(shifon|sholk|sho‘yi|shoyi|ipak|ipag|harir|organza|batist)/;
  // Xitoydan keladiganlar: «3 tasi 100 000» takliflari, 75 000 lik Xitoy tvil va «2 tasi 100 000» kashemir
  const isChina = p => (+p.promo_qty === 3 && +p.promo_total === 100000) || +p.price_number === 75000 || /xitoy/i.test(p.name_uz || p.name) || (/kashemir/i.test(p.name_uz || p.name) && +p.promo_qty === 2 && +p.promo_total === 100000);
  const tagsOf = p => String(p.tags_uz || p.tags || '').toLowerCase();

  /* --- matching --- */
  let A = {}, shown = [];
  function rank() {
    const list = ($PRODUCTS() || []).map((p, i) => ({ p, i })).filter(({ p }) =>
      p.vars && p.vars.length && !p.sold_out && !/(abaya|namozlik)/.test(tagsOf(p)) && p.vars.some(v => !v.sold_out));
    return list.map(o => {
      const { p } = o, pr = $priceNum() ? $priceNum()(p) : 0, m = mat(p), why = [];
      let s = 0;
      // narx
      if (A.price && A.price !== 'any') {
        if (!pr) s -= 6;
        else if ((A.price === 'p1' && pr <= 100000) || (A.price === 'p2' && pr > 100000 && pr <= 250000) || (A.price === 'p3' && pr > 250000)) s += 6;
        else s -= 8;
      } else if (!pr) s -= 1;
      // mato
      if (A.fab === 'grip') { if (GRIP.test(m)) { s += 4; why.push('r_grip'); } else if (AIRY.test(m)) s -= 3; }
      if (A.fab === 'airy') { if (AIRY.test(m) && !/tvil/.test(m)) { s += 4; why.push('r_airy'); } else if (GRIP.test(m)) s -= 2; }
      // maqsad
      if (A.use === 'daily') { if (pr && pr <= 150000) s += 2; if (GRIP.test(m)) s += 1; why.push('r_daily'); }
      if (A.use === 'special') { if (pr >= 150000 || /(sholk|harir|jakkard|eksklyuziv|sherst)/.test(m + nm(p))) { s += 3; why.push('r_special'); } }
      if (A.who === 'gift') { if (pr >= 100000) s += 1; why.push('r_gift'); }
      // rang
      const vs = p.vars.map((v, k) => ({ v, k })).filter(x => !x.v.sold_out);
      let best = vs.find(x => x.v.hex && (A.col === 'any' || !A.col || tone(x.v.hex) === A.col));
      if (A.col && A.col !== 'any') { const n = vs.filter(x => tone(x.v.hex) === A.col).length; s += n ? 2 + Math.min(n, 4) * .5 : -3; }
      if (!best) best = vs[0];
      if (p.is_new) { s += .8; why.push('r_new'); }
      if (+p.promo_qty > 1 && +p.promo_total > 0) s += .5;
      return { ...o, s, k: best.k, why };
    }).sort((a, b) => b.s - a.s);
  }

  /* --- UI --- */
  const css = `
  .mx-fab{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:8px;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);border:0;border-radius:999px;padding:11px 16px 11px 12px;font:400 12px/1 var(--sans,system-ui);letter-spacing:.12em;text-transform:uppercase;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.22);transition:.3s}
  .mx-fab i{width:26px;height:26px;border-radius:50%;background:var(--accent,#8c6a4f);display:grid;place-items:center;font-style:normal;font-size:14px}
  .mx-fab.hid{opacity:0;pointer-events:none;transform:translateY(10px)}
  .mx{position:fixed;right:18px;bottom:18px;z-index:61;width:min(370px,calc(100vw - 32px));max-height:min(620px,calc(100vh - 36px));display:flex;flex-direction:column;background:#f6f1eb;color:var(--ink,#2b2622);box-shadow:0 24px 60px rgba(0,0,0,.28);border-radius:18px;overflow:hidden;font-family:var(--sans,system-ui);font-weight:300;opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:.32s cubic-bezier(.2,.8,.2,1)}
  .mx.on{opacity:1;transform:none;pointer-events:auto}
  .mx-h{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;border-bottom:1px solid var(--line,#d1c6b9);background:var(--bg,#e9e2d9)}
  .mx-av{width:34px;height:34px;border-radius:50%;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);display:grid;place-items:center;font-family:var(--serif,Georgia);font-size:16px;letter-spacing:.05em;position:relative;flex:none}
  .mx-av:after{content:"";position:absolute;right:0;bottom:0;width:9px;height:9px;border-radius:50%;background:#4caf6a;border:2px solid var(--bg,#e9e2d9)}
  .mx-h b{font-weight:500;font-size:13px;display:block}.mx-h small{font-size:11px;color:var(--muted,#73685e)}
  .mx-x{margin-left:auto;background:none;border:0;font-size:22px;line-height:1;color:var(--muted,#73685e);cursor:pointer;padding:4px 6px}
  .mx-b{overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth}
  .mx-m{align-self:flex-start;max-width:88%;background:#fff;border-radius:14px 14px 14px 4px;padding:10px 13px;font-size:14px;line-height:1.45;animation:mxIn .3s both}
  .mx-m.me{align-self:flex-end;background:var(--ink,#2b2622);color:var(--bg,#e9e2d9);border-radius:14px 14px 4px 14px}
  .mx-o{display:flex;flex-wrap:wrap;gap:6px;padding:2px 0 6px;animation:mxIn .3s .1s both}
  .mx-o button,.mx-o a{border:1px solid var(--ink,#2b2622);background:transparent;color:var(--ink,#2b2622);border-radius:999px;padding:8px 13px;font:400 13px/1.2 var(--sans,system-ui);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
  .mx-o button:hover,.mx-o a:hover{background:var(--ink,#2b2622);color:var(--bg,#e9e2d9)}
  .mx-o .solid{background:var(--ink,#2b2622);color:var(--bg,#e9e2d9)}
  .mx-o .ig{border:0;color:#fff;background:linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);padding:10px 15px;font-weight:500}
  .mx-o .ig svg{width:17px;height:17px}
  .mx-c{display:grid;grid-template-columns:76px 1fr;gap:11px;background:#fff;border-radius:14px;padding:8px;animation:mxIn .35s both;cursor:pointer}
  .mx-c img{width:76px;height:101px;object-fit:cover;border-radius:9px;background:#eee}
  .mx-c h4{font:500 13px/1.3 var(--sans,system-ui);margin:2px 0 3px}
  .mx-c .pr{font-size:13px;margin-bottom:3px}.mx-c .pr s{color:var(--muted,#73685e);font-size:12px}
  .mx-c p{font-size:12px;color:var(--muted,#73685e);line-height:1.4;margin:0 0 6px}
  .mx-c .acts{display:flex;gap:6px;flex-wrap:wrap}
  .mx-c .acts button{border:1px solid var(--ink,#2b2622);background:transparent;border-radius:999px;padding:5px 10px;font:400 11px/1.2 var(--sans,system-ui);cursor:pointer;color:var(--ink,#2b2622)}
  .mx-c .acts .solid{background:var(--ink,#2b2622);color:var(--bg,#e9e2d9)}
  .mx-sw{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0 6px}
  .mx-sw button{width:54px;border:0;background:none;padding:0;cursor:pointer;font:400 10px/1.2 var(--sans,system-ui);color:var(--ink,#2b2622);text-align:center}
  .mx-sw img{width:54px;height:72px;object-fit:cover;border-radius:8px;display:block;margin-bottom:3px;outline:1px solid var(--line,#d1c6b9)}
  .mx-sw button.ok img{outline:2px solid #4caf6a}
  @keyframes mxIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @media (max-width:900px){.mx-fab{bottom:84px;right:14px;padding:10px 12px}.mx-fab span{display:none}.mx{right:12px;left:12px;width:auto;bottom:12px;max-height:calc(100vh - 90px)}}
  `;
  let box, body, fab;
  function build() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    fab = document.createElement('button'); fab.className = 'mx-fab hid'; fab.type = 'button';
    document.body.appendChild(fab);
    box = document.createElement('div'); box.className = 'mx'; box.setAttribute('role', 'dialog');
    document.body.appendChild(box);
    fab.onclick = () => { goal('open'); open(); if (!body.children.length) start(); };
    paint();
  }
  function paint() {
    const t = L();
    fab.innerHTML = `<i>✦</i><span>${E(t.help)}</span>`; fab.setAttribute('aria-label', t.help);
    box.setAttribute('aria-label', t.expert);
    const keep = body ? body.innerHTML : '';
    box.innerHTML = `<div class="mx-h"><div class="mx-av">EP</div><div><b>${E(t.expert)}</b><small>online</small></div><button class="mx-x" aria-label="${E(t.close)}">×</button></div><div class="mx-b"></div>`;
    body = box.querySelector('.mx-b'); body.innerHTML = keep;
    box.querySelector('.mx-x').onclick = close;
  }
  const isOpen = () => box.classList.contains('on');
  function open() { box.classList.add('on'); fab.classList.add('hid'); }
  function close() { box.classList.remove('on'); fab.classList.remove('hid'); SS.set('closed', '1'); }
  const scroll = () => requestAnimationFrame(() => body.scrollTop = body.scrollHeight);
  function say(html, me) { const d = document.createElement('div'); d.className = 'mx-m' + (me ? ' me' : ''); d.innerHTML = html; body.appendChild(d); scroll(); return d; }
  function opts(list) {
    const d = document.createElement('div'); d.className = 'mx-o';
    list.forEach(o => {
      const b = document.createElement(o.href ? 'a' : 'button');
      if (o.href) { b.href = o.href; b.target = '_blank'; b.rel = 'noopener'; } else b.type = 'button';
      if (o.cls) b.className = o.cls;
      b.innerHTML = o.html || E(o.label);
      b.onclick = e => { if (o.keep !== true) d.remove(); if (o.echo !== false && !o.href) say(E(o.label), true); o.go && o.go(e); };
      d.appendChild(b);
    });
    body.appendChild(d); scroll(); return d;
  }
  const later = (fn, ms = 450) => setTimeout(fn, ms);

  /* --- dialog --- */
  function start() {
    const t = L(); body.innerHTML = ''; A = {}; shown = [];
    say(`<b>${E(t.hi)}</b><br>${E(t.hi2)}`);
    opts([{ label: t.yes, cls: 'solid', go: () => { goal('start'); later(q1); } }, { label: t.no, go: () => later(close, 250) }]);
  }
  function origin() {
    const t = L(); goal('origin');
    say(E(t.originA)); later(() => { say(E(t.originB)); opts([{ label: t.more, go: () => later(results, 200) }, { label: t.restart, echo: false, go: () => later(start, 100) }]); }, 700);
  }
  const ask = (q, list, key, next) => { say(E(q)); opts(list.map(([v, lab]) => ({ label: lab, go: () => { A[key] = v; later(next); } }))); };
  const q1 = () => { const t = L(); ask(t.q1, [['self', t.self], ['gift', t.gift]], 'who', q2); };
  const q2 = () => { const t = L(); ask(t.q2, [['daily', t.daily], ['special', t.special]], 'use', q3); };
  const q3 = () => { const t = L(); ask(t.q3, [['dark', t.dark], ['light', t.light], ['bright', t.bright], ['any', t.any]], 'col', q4); };
  const q4 = () => { const t = L(); ask(t.q4, [['grip', t.grip], ['airy', t.airy], ['any', t.any]], 'fab', q5); };
  const q5 = () => { const t = L(); ask(t.q5, [['p1', t.p1], ['p2', t.p2], ['p3', t.p3], ['any', t.any]], 'price', () => { goal('answers'); results(); }); };

  const priceLine = p => p.price ? `${E(p.price)}${p.old_price ? ` <s>${E(p.old_price)}</s>` : ''}` : `<i>${E(L().ask)}</i>`;
  const thumb = (p, k) => { const v = p.vars[k]; return E($smP() ? $smP()(v.ims[0]) : v.ims[0]); };
  function results() {
    const t = L(), r = rank().filter(x => !shown.includes(x.i)), top = r.slice(0, 3);
    if (!top.length) { start(); return; }
    say(E(top[0].s > 2 ? t.res : t.none));
    top.forEach(x => {
      shown.push(x.i);
      const p = x.p, why = [...new Set(x.why)].slice(0, 2).map(w => t[w]);
      if (+p.promo_qty > 1 && +p.promo_total > 0 && $fmt()) why.push(t.r_promo(p.promo_qty, $fmt()(+p.promo_total)));
      const c = document.createElement('div'); c.className = 'mx-c';
      c.innerHTML = `<img src="${thumb(p, x.k)}" alt="" loading="lazy"><div><h4>${E(p.name)}${p.vars[x.k] ? ` — <span style="font-weight:300">${E(p.vars[x.k].name)}</span>` : ''}</h4><div class="pr">${priceLine(p)}</div><p>${E(why.join(' '))}</p><div class="acts"><button class="solid" data-t>${E(t.take)}</button>${p.vars.length > 1 ? `<button data-c>${E(t.otherColors)}</button>` : ''}${isChina(p) ? `<button data-o>${E(t.origin)}</button>` : ''}</div></div>`;
      c.onclick = e => {
        if (e.target.closest('[data-t]')) { e.stopPropagation(); take(x.i, x.k); return; }
        if (e.target.closest('[data-c]')) { e.stopPropagation(); colors(x.i, x.k); return; }
        if (e.target.closest('[data-o]')) { e.stopPropagation(); say(E(t.origin), true); later(origin); return; }
        goal('view'); window.openProduct && openProduct(x.i, true, x.k); box.classList.remove('on'); fab.classList.remove('hid');
      };
      body.appendChild(c);
    });
    scroll();
    const more = r.length > 3;
    later(() => opts([...(more ? [{ label: t.more, go: () => later(results, 200) }] : []), { label: t.restart, echo: false, go: () => later(start, 100) }]), 300);
  }
  function swatches(i, list, onPick) {
    const p = $PRODUCTS()[i], d = document.createElement('div'); d.className = 'mx-sw';
    list.forEach(k => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `<img src="${thumb(p, k)}" alt="">${E(p.vars[k].name)}`; b.onclick = () => onPick(k, b); d.appendChild(b); });
    body.appendChild(d); scroll();
  }
  function colors(i, cur) {
    const t = L(), p = $PRODUCTS()[i];
    say(E(t.which));
    const list = p.vars.map((v, k) => k).filter(k => !p.vars[k].sold_out && !p.vars[k].card_hide).slice(0, 12);
    swatches(i, list, k => take(i, k));
  }
  let picked = [];
  function take(i, k) {
    const t = L(), p = $PRODUCTS()[i];
    window.cartAdd && cartAdd(p.slug, k); picked.push([i, k]); goal('cart');
    try { window.updateBadges && updateBadges(); } catch (e) {}
    say(`${E(p.name)} — ${E(p.vars[k].name)}`, true);
    later(() => {
      say(E(t.added));
      const others = p.vars.map((v, j) => j).filter(j => j !== k && !p.vars[j].sold_out && !p.vars[j].card_hide);
      const neutral = others.filter(j => NEUTRAL.test(p.vars[j].name_uz || p.vars[j].name)), pool = (neutral.length >= 2 ? neutral : others).slice(0, 4);
      if (pool.length) {
        say(E(+p.promo_qty > 1 && +p.promo_total > 0 && $fmt() ? t.up(p.promo_qty, $fmt()(+p.promo_total)) : t.up0));
        swatches(i, pool, (j, b) => { if (b.classList.contains('ok')) return; b.classList.add('ok'); cartAdd(p.slug, j); picked.push([i, j]); goal('upsell'); try { toast($S_().cart_added); } catch (e) {} });
      }
      closing();
    }, 400);
  }
  function closing() {
    const t = L(), S = $S_() || {};
    const lines = picked.map(([i, k]) => { const p = $PRODUCTS()[i]; return `• ${p.name_uz || p.name} — ${p.vars[k].name_uz || p.vars[k].name}`; });
    const tgUrl = S.telegram ? `${S.telegram}${S.telegram.includes('?') ? '&' : '?'}text=${encodeURIComponent(t.tgMsg + '\n' + [...new Set(lines)].join('\n'))}` : '';
    later(() => opts([
      { label: t.calc, cls: 'solid', keep: true, echo: false, go: () => { goal('checkout'); window.openCart && openCart(); close(); } },
      ...(tgUrl ? [{ label: t.tg, href: tgUrl, keep: true, go: () => goal('tg') }] : []),
      { label: t.more, keep: false, go: () => later(results, 200) }
    ]), 300);
  }

  /* --- exit intent --- */
  const IG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  function goodbye() {
    if (SS.get('bye') || busy()) return;
    SS.set('bye', '1'); goal('exit');
    const t = L(), S = $S_() || {}, r = rank().filter(x => !shown.includes(x.i) && (x.p.is_new || /bestseller/.test(tagsOf(x.p))));
    const pick = (r.length ? r : rank())[0];
    body.innerHTML = ''; open();
    say(E(t.bye));
    if (pick) {
      const p = pick.p, c = document.createElement('div'); c.className = 'mx-c';
      c.innerHTML = `<img src="${thumb(p, pick.k)}" alt=""><div><h4>${E(p.name)}</h4><div class="pr">${priceLine(p)}</div><div class="acts"><button class="solid">${E(t.look)}</button></div></div>`;
      c.onclick = () => { goal('exit_view'); window.openProduct && openProduct(pick.i, true, pick.k); close(); };
      body.appendChild(c);
    }
    say(E(t.bye2));
    const igU = (String(S.instagram || '').match(/instagram\.com\/([A-Za-z0-9_.]+)/) || [])[1];
    opts([...(S.instagram ? [{ label: t.ig, html: `${IG_SVG}${E(t.ig)}${igU ? ` · @${E(igU)}` : ''}`, href: S.instagram, cls: 'ig', keep: true, go: () => goal('instagram') }] : []),
          { label: t.close, echo: false, go: close }]);
  }
  const busy = () => isOpen() || document.getElementById('pm')?.classList.contains('open') || document.getElementById('drawer')?.classList.contains('on') || document.getElementById('srch')?.classList.contains('open');

  /* --- start-up --- */
  const t0 = Date.now();
  function init() {
    if (!$PRODUCTS() || !$PRODUCTS().length) return setTimeout(init, 400);
    build();
    // tilni almashtirganda matnlar yangilanadi
    let lang = $LANG(); setInterval(() => { if ($LANG() !== lang) { lang = $LANG(); paint(); } }, 800);
    // salomlashish: 18 soniyadan keyin, bir tashrifda bir marta, mahsulot/savat oynasi ochiq bo'lmasa
    const greet = () => { if (SS.get('greeted') || SS.get('closed')) { fab.classList.remove('hid'); return; } if (busy()) return setTimeout(greet, 4000); SS.set('greeted', '1'); goal('greet'); start(); open(); };
    fab.classList.remove('hid');
    setTimeout(greet, Math.max(0, 18000 - (Date.now() - t0)));
    // ketmoqchi bo'lsa: kompyuterda sichqoncha yuqoriga chiqsa; telefonda 50 soniya harakatsizlik
    document.addEventListener('mouseout', e => { if (!e.relatedTarget && e.clientY <= 0 && Date.now() - t0 > 12000) goodbye(); });
    if (matchMedia('(hover: none)').matches) {
      let idle; const reset = () => { clearTimeout(idle); idle = setTimeout(goodbye, 50000); };
      ['touchstart', 'scroll'].forEach(ev => addEventListener(ev, reset, { passive: true })); reset();
    }
  }
  if (location.search.includes('mx=0')) return;
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
