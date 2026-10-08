/**
 * Elite Platok — saytdan kelgan buyurtmalarni Telegram'ga yuboradi
 * (shaxsiy chatga yoki kanalga), mahsulot rasmlari bilan.
 *
 * Sozlash (bir marta):
 *   1. script.google.com → "Yangi loyiha" → shu faylni joylang.
 *   2. ⚙️ "Project Settings" → "Script properties" → qo‘shing:
 *        BOT_TOKEN  — @BotFather bergan token
 *   3. Telegram'da botingizga /start yozing.
 *      Keyin shu yerda yuqoridagi ro‘yxatdan "setupChat" ni tanlab ▶ Run bosing —
 *      bot sizning chatingizni eslab qoladi va sinov xabari yuboradi.
 *      (Keyinroq kanalga o‘tkazish uchun: CHAT_ID ni kanal manziliga, masalan @kanal_nomi, almashtiring.)
 *   4. "Deploy" → "New deployment" → turi "Web app":
 *        Execute as: Me      Who has access: Anyone
 *   5. Berilgan "Web app URL" ni sayt panelida «Buyurtma qabul qiluvchi manzil» maydoniga qo‘ying.
 *
 * Token faqat shu yerda (Script properties ichida) saqlanadi — saytda ko‘rinmaydi.
 */

const SITE = 'https://eliteplatok.uz/'; // faqat shu saytdagi rasmlar yuboriladi
const MAX_ITEMS = 30;

function doPost(e) {
  try {
    const o = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam-botlar uchun yashirin maydon: to‘ldirilgan bo‘lsa, jim o‘tkazib yuboramiz.
    if (o.website) return reply_({ ok: true });

    const name = clean_(o.name, 80);
    const phone = clean_(o.phone, 30);
    if (name.length < 2 || phone.replace(/\D/g, '').length < 7) return reply_({ ok: false, error: 'invalid' });

    const items = (Array.isArray(o.items) ? o.items : []).slice(0, MAX_ITEMS);
    if (!items.length) return reply_({ ok: false, error: 'empty' });

    // Bir xil buyurtmani qayta-qayta yuborishdan himoya: bir telefondan 1 daqiqada bitta.
    const cache = CacheService.getScriptCache();
    const key = 'p' + phone.replace(/\D/g, '');
    if (cache.get(key)) return reply_({ ok: true, duplicate: true });
    cache.put(key, '1', 60);

    const time = Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm');
    const lines = [
      '🛍 <b>Yangi buyurtma</b> · ' + time,
      '',
      '👤 ' + esc_(name),
      '📞 ' + esc_(phone),
      o.how === 'pickup' ? '🏬 Do‘kondan olib ketadi' : '🚚 Yetkazib berish: ' + esc_(clean_(o.address, 200) || '—'),
    ];
    const comment = clean_(o.comment, 500);
    if (comment) lines.push('💬 ' + esc_(comment));
    lines.push('');

    const photos = [];
    items.forEach(function (x, i) {
      const qty = Math.max(1, Math.min(99, parseInt(x.qty, 10) || 1));
      const title = clean_(x.name, 80);
      const price = clean_(x.price, 40);
      const link = String(x.link || '').indexOf(SITE) === 0 ? '<a href="' + esc_(x.link) + '">' + esc_(title) + '</a>' : esc_(title);
      lines.push((i + 1) + '. ' + link + ' × ' + qty + ' — ' + esc_(price));
      const img = String(x.image || '');
      if (img.indexOf(SITE) === 0) photos.push({ url: img, caption: (i + 1) + '. ' + title + ' × ' + qty + (price ? ' — ' + price : '') });
    });
    const total = Number(o.total) > 0 ? Number(o.total).toLocaleString('ru-RU') + ' so‘m' : '—';
    lines.push('', '<b>Jami:</b> ' + esc_(total) + (o.unknown ? ' (+ aksiya / $ mahsulotlar)' : ''));

    tg_('sendMessage', { text: lines.join('\n').slice(0, 4000), parse_mode: 'HTML', disable_web_page_preview: true });
    sendPhotos_(photos);
    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: 'server' });
  }
}

/** Mahsulot rasmlarini albom qilib yuboradi (Telegram bir albomda ko‘pi bilan 10 ta rasm qabul qiladi). */
function sendPhotos_(photos) {
  for (let i = 0; i < photos.length; i += 10) {
    const chunk = photos.slice(i, i + 10);
    try {
      if (chunk.length === 1) {
        tg_('sendPhoto', { photo: chunk[0].url, caption: chunk[0].caption });
      } else {
        tg_('sendMediaGroup', { media: chunk.map(function (p) { return { type: 'photo', media: p.url, caption: p.caption }; }) });
      }
    } catch (err) {
      console.error('Rasm yuborilmadi: ' + err); // rasm yuborilmasa ham buyurtma matni allaqachon ketgan
    }
  }
}

/**
 * Botga /start yozgandan keyin shu funksiyani ishga tushiring:
 * oxirgi /start yozgan shaxsiy chatni CHAT_ID qilib saqlaydi va sinov xabarini yuboradi.
 */
function setupChat() {
  const res = tg_('getUpdates', { allowed_updates: ['message'] }, true);
  const starts = (res.result || []).filter(function (u) {
    return u.message && u.message.chat && u.message.chat.type === 'private' && /^\/start/.test(u.message.text || '');
  });
  if (!starts.length) throw new Error('Avval Telegram\'da botingizga /start yozing, keyin qayta ishga tushiring.');
  const chat = starts[starts.length - 1].message.chat;
  PropertiesService.getScriptProperties().setProperty('CHAT_ID', String(chat.id));
  tg_('sendMessage', { text: '✅ Elite Platok: sayt buyurtmalari endi shu chatga keladi.' });
  console.log('CHAT_ID saqlandi: ' + chat.id + ' (' + (chat.first_name || '') + ' ' + (chat.username ? '@' + chat.username : '') + ')');
}

/** Sinov uchun: kanalga yoki chatga sinov xabari yuboradi. */
function testMessage() {
  tg_('sendMessage', { text: '✅ Elite Platok: sinov xabari.' });
}

function tg_(method, params, noChat) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('BOT_TOKEN');
  if (!token) throw new Error('BOT_TOKEN kiritilmagan (Project Settings → Script properties)');
  const body = Object.assign({}, params);
  if (!noChat) {
    const chat = props.getProperty('CHAT_ID');
    if (!chat) throw new Error('CHAT_ID yo‘q — botga /start yozib, setupChat ni ishga tushiring');
    body.chat_id = chat;
  }
  const res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  const data = JSON.parse(res.getContentText() || '{}');
  if (!data.ok) throw new Error('Telegram ' + method + ': ' + (data.description || res.getResponseCode()));
  return data;
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B-\u001F]/g, '').trim().slice(0, max);
}
function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
