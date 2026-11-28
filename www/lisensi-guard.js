/* Penjaga lisensi. Pasang di www/ tiap aplikasi yang ingin dikontrol.
   Di index.html (sebelum script lain):
   <script>window.LISENSI={url:"https://NAMA-default-rtdb.firebaseio.com",app:"cici-snack"}</script>
   <script src="lisensi-guard.js"></script>
   Waktu memakai jam server Firebase, jadi mengubah jam HP tidak berpengaruh. */
(function () {
  var C = window.LISENSI || {};
  if (!C.url || !C.app) return;
  var KEY = 'lis_' + C.app, GRACE = 72 * 36e5, SV = { '.sv': 'timestamp' };
  var base = C.url.replace(/\/$/, '');
  function rid() {
    var a = new Uint8Array(10); crypto.getRandomValues(a);
    return Array.from(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  var id = localStorage.getItem(KEY + '_id');
  if (!id) { id = rid(); localStorage.setItem(KEY + '_id', id); }
  var cache = {}; try { cache = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}

  function tf(path, opt) {
    return fetch(base + '/' + path, opt).then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.json();
    });
  }
  function calc(d, c, now) {
    if (c && c.on === 0) return { ok: 0, why: 'Aplikasi ini dinonaktifkan oleh admin.' };
    if (d.s === 'off') return { ok: 0, why: 'Lisensi perangkat ini dinonaktifkan.' };
    if (d.s === 'active') {
      if (d.exp && now > d.exp) return { ok: 0, why: 'Masa lisensi sudah berakhir.' };
      return { ok: 1, type: 'active', end: d.exp || 0 };
    }
    var end = d.exp || (d.t0 + ((c && c.trial) || 7) * 864e5);
    if (now > end) return { ok: 0, why: 'Masa trial sudah habis.' };
    return { ok: 1, type: 'trial', end: end };
  }
  function check() {
    var p = 'lisensi/' + C.app + '/dev/' + id;
    return tf(p + '.json').then(function (d) {
      var k = p + '/', u = {};
      u[k + 'seen'] = SV;
      if (!d) { u[k + 's'] = 'trial'; u[k + 't0'] = SV; u[k + 'n'] = (C.name || C.app) + ' ' + id.slice(-4); }
      return tf('.json', { method: 'PATCH', body: JSON.stringify(u) });
    }).then(function () {
      return Promise.all([tf(p + '.json'), tf('lisensi/' + C.app + '/cfg.json')]);
    }).then(function (r) {
      var d = r[0], c = r[1] || {};
      if (!d || !d.seen) throw new Error('data');
      var res = calc(d, c, d.seen);
      res.off = d.seen - Date.now(); res.at = Date.now();
      cache = res; localStorage.setItem(KEY, JSON.stringify(res));
      return res;
    }).catch(function () {
      var now = Date.now();
      if (cache.ok && now - cache.at < GRACE && (!cache.end || now + cache.off < cache.end)) return cache;
      return { ok: 0, why: 'Tidak bisa memeriksa lisensi. Sambungkan internet lalu coba lagi.', offline: 1 };
    });
  }

  var ov, bar;
  function ui(res) {
    if (!ov) {
      ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#f4f6f3;color:#222;display:none;align-items:center;justify-content:center;padding:24px;text-align:center;font:16px system-ui,sans-serif';
      document.documentElement.appendChild(ov);
      bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483646;background:#fff3cd;color:#664d03;font:12px system-ui,sans-serif;text-align:center;padding:3px;display:none';
      document.documentElement.appendChild(bar);
    }
    if (res && res.ok) {
      ov.style.display = 'none';
      if (res.type === 'trial') {
        var left = Math.max(0, res.end - (Date.now() + res.off));
        bar.textContent = 'Mode trial: sisa ' + (left > 864e5 ? Math.ceil(left / 864e5) + ' hari' : Math.ceil(left / 36e5) + ' jam');
        bar.style.display = 'block';
      } else bar.style.display = 'none';
      return;
    }
    bar.style.display = 'none';
    ov.style.display = 'flex';
    ov.innerHTML = '<div style="max-width:320px"><div style="font-size:44px">🔒</div><h2 style="margin:8px 0">' +
      (res ? (res.offline ? 'Perlu koneksi' : 'Aplikasi terkunci') : 'Memeriksa lisensi...') + '</h2><p>' + (res ? res.why : '') +
      '</p>' + (res && !res.offline ? '<p style="font-size:13px;color:#666">Kirim ID perangkat ini ke admin:<br><b style="font-size:15px;user-select:all">' + id + '</b></p>' : '') +
      (res ? '<button id="lisc" style="margin-top:12px;padding:10px 20px;border:0;border-radius:8px;background:#2e7d32;color:#fff;font-size:15px">Periksa lagi</button>' : '') + '</div>';
    var b = document.getElementById('lisc'); if (b) b.onclick = run;
  }
  function run() { if (!cache.ok) ui(null); check().then(ui); }
  run();
  document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });
  setInterval(run, 10 * 60 * 1000);
})();
