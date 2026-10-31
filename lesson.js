/* BravoTen lesson player: illustrated explanation -> interactive steps -> game questions -> reward */
(function () {
  'use strict';
  const BT = window.BT || { courses: {} };
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const qs = new URLSearchParams(location.search);
  const cid = qs.get('c') || 'kg1-ar';
  const ui = Math.max(0, parseInt(qs.get('u') || '0', 10) || 0);
  const li = Math.max(0, parseInt(qs.get('l') || '0', 10) || 0);
  const course = BT.courses[cid];
  const lesson = course && course.units[ui] && course.units[ui][li];
  const app = $('app');

  if (!lesson) {
    app.innerHTML = '<div class="err card"><div style="font-size:4rem">🧭</div><h2>الدرس غير موجود / Lesson not found</h2><p><a class="btn" href="kg1.html">← kg1</a></p></div>';
    return;
  }

  const ar = course.lang === 'ar';
  document.documentElement.lang = ar ? 'ar' : 'en';
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  document.title = lesson.t + ' — BravoTen';
  $('backLink').href = 'kg1.html?c=' + encodeURIComponent(cid) + '&u=' + ui;
  if (!ar) app.classList.add('ltr');

  const T = ar
    ? {
        back: '← الدروس', crumb: (u, l) => 'KG1 · الوحدة ' + (u + 1) + ' · درس ' + (l + 1),
        next: 'التالي ←', prev: '→ السابق', start: 'يلا نلعب! 🎮', tap: 'اضغط على الصور لتسمعها 👆', reveal: 'اضغط لتظهر الجملة التالية 👆',
        listen: '🔊 اسمع الشرح', q: (i, n) => 'سؤال ' + (i + 1) + ' من ' + n, again: ['جرّب تاني، أنت تقدر! 💪', 'قريب جدًا! حاول مرة أخرى 🌈', 'لا بأس، فكّر وجرّب ✨'],
        good: ['أحسنت! 🎉', 'برافو عليك! 🌟', 'ممتاز! 👏', 'شاطر جدًا! 💛', 'رائع! 🚀'],
        win: ['مبروك يا بطل!', 'أحسنت جدًا!', 'شاطر! كمّل!'], got: 'حصلت على ملصق جديد!', replay: 'العب تاني 🔄', nextLesson: 'الدرس التالي ←', toList: 'قائمة الدروس',
        hello: 'يلا نتعلّم! اضغط واستمتع', stars: 'نجوم', sticker: 'ملصق', allDone: 'خلّصت كل الدروس! 🏆',
      }
    : {
        back: '← Lessons', crumb: (u, l) => 'KG1 English · Unit ' + (u + 1) + ' · Lesson ' + (l + 1),
        next: 'Next →', prev: '← Back', start: 'Let’s play! 🎮', tap: 'Tap the pictures to listen 👆', reveal: 'Tap to show the next line 👆',
        listen: '🔊 Listen', q: (i, n) => 'Question ' + (i + 1) + ' of ' + n, again: ['Try again, you can do it! 💪', 'So close! Try once more 🌈', 'That’s OK, think and try ✨'],
        good: ['Great job! 🎉', 'Bravo! 🌟', 'Super! 👏', 'Well done! 💛', 'Awesome! 🚀'],
        win: ['Congratulations, champion!', 'Great work!', 'You did it!'], got: 'New sticker!', replay: 'Play again 🔄', nextLesson: 'Next lesson →', toList: 'All lessons',
        hello: 'Let’s learn!', stars: 'stars', sticker: 'sticker', allDone: 'You finished every lesson! 🏆',
      };
  $('backLink').textContent = T.back;

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  };
  const lid = cid + ':' + ui + ':' + li;
  const totalStars = () => Object.values(store.get('bt.progress', {})).reduce((a, b) => a + (b.stars || 0), 0);
  const refreshHud = () => { $('totalStars').textContent = totalStars(); };
  refreshHud();

  /* ---------- sound & voice ---------- */
  let muted = store.get('bt.mute', false);
  const muteBtn = $('muteBtn');
  const paintMute = () => { muteBtn.textContent = muted ? '🔇' : '🔊'; muteBtn.setAttribute('aria-pressed', String(muted)); };
  paintMute();
  muteBtn.addEventListener('click', () => { muted = !muted; store.set('bt.mute', muted); paintMute(); if (muted && window.speechSynthesis) speechSynthesis.cancel(); });
  let ac;
  function tone(seq) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      let t = ac.currentTime;
      seq.forEach(([f, d]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = 'triangle'; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.start(t); o.stop(t + d + 0.02); t += d * 0.85;
      });
    } catch (e) { /* audio not available */ }
  }
  const sOk = () => tone([[660, 0.12], [880, 0.12], [1175, 0.2]]);
  const sNo = () => tone([[300, 0.16], [240, 0.22]]);
  const sPop = () => tone([[520, 0.08]]);
  const sWin = () => tone([[523, 0.14], [659, 0.14], [784, 0.14], [1047, 0.34]]);
  function speak(text) {
    if (muted || !text || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, ''));
      u.lang = ar ? 'ar-EG' : 'en-US'; u.rate = ar ? 0.8 : 0.85; u.pitch = 1.1;
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ---------- effects ---------- */
  const calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function confetti(n) {
    if (calm) return;
    const bits = ['🎉', '⭐', '✨', '🎈', '💛', '🌈', '🎊'];
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'confetti'; s.textContent = bits[Math.floor(Math.random() * bits.length)];
      s.style.left = Math.random() * 100 + 'vw'; s.style.animationDuration = 2.2 + Math.random() * 2.2 + 's'; s.style.animationDelay = Math.random() * 0.6 + 's';
      s.style.fontSize = 1.1 + Math.random() * 1.4 + 'rem';
      document.body.appendChild(s); setTimeout(() => s.remove(), 5500);
    }
  }
  function sparkle(el) {
    if (calm || !el) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 7; i++) {
      const s = document.createElement('span');
      s.className = 'spark'; s.textContent = ['✨', '⭐', '💫'][i % 3];
      s.style.left = cx + 'px'; s.style.top = cy + 'px';
      const a = (Math.PI * 2 * i) / 7;
      s.style.setProperty('--dx', Math.cos(a) * 70 + 'px'); s.style.setProperty('--dy', Math.sin(a) * 70 + 'px');
      document.body.appendChild(s); setTimeout(() => s.remove(), 900);
    }
  }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  /* ---------- header / frame ---------- */
  function frame(inner) {
    return '<div class="crumb">' + esc(T.crumb(ui, li)) + '</div><h1>' + esc(lesson.t) + '</h1><p class="goal">' + esc(lesson.goal || '') + '</p>' + inner;
  }

  /* ---------- LEARN phase ---------- */
  let step = 0;
  const seen = lesson.steps.map(() => ({}));
  const nSteps = lesson.steps.length;

  function dots() {
    let h = '<div class="dots" aria-hidden="true">';
    for (let i = 0; i < nSteps; i++) h += '<span class="dot ' + (i < step ? 'done' : i === step ? 'on' : '') + '"></span>';
    return h + '</div>';
  }
  const sayOf = (s) => s.say || [s.h, s.p].concat((s.list || []).map((x) => x[1])).concat(s.story || []).filter(Boolean).join('. ');

  function renderStep() {
    const s = lesson.steps[step];
    let body = '';
    body += '<div class="mascot-row"><div class="mascot" aria-hidden="true">🧸</div><div class="bubble"><h2>' + esc(s.h) + '</h2>' + (s.p ? '<p>' + esc(s.p) + '</p>' : '') + '<button class="say" id="sayStep">' + T.listen + '</button></div></div>';
    if (s.big) body += '<div class="bigbox"><button class="big" id="bigBtn" aria-label="' + esc(s.sub || s.big) + '">' + esc(s.big) + '</button>' + (s.sub ? '<div class="sub">' + esc(s.sub) + '</div>' : '') + '</div>';
    if (s.forms) body += '<div class="forms">' + s.forms.map((f) => '<div class="form"><b>' + esc(f[1]) + '</b><small>' + esc(f[0]) + '</small></div>').join('') + '</div>';
    if (s.items) {
      body += '<div class="hint"><span>' + T.tap + '</span><span class="meter"><span id="meter"></span></span></div><div class="items">';
      s.items.forEach((it, j) => {
        const multi = (it[0] || '').length > 5 ? ' multi' : '';
        body += '<button class="item" data-j="' + j + '" data-say="' + esc(it[1]) + '"><span class="seen">✓</span><span class="pic' + multi + '">' + esc(it[0]) + '</span><span class="word">' + esc(it[1]) + '</span>' + (it[2] ? '<small class="tag">' + esc(it[2]) + '</small>' : '') + '</button>';
      });
      body += '</div>';
    }
    if (s.list) body += '<ul class="list">' + s.list.map((x, k) => '<li data-say="' + esc(x[1]) + '" style="animation-delay:' + k * 0.18 + 's"><span class="e">' + esc(x[0]) + '</span><span>' + esc(x[1]) + '</span></li>').join('') + '</ul>';
    if (s.story) {
      body += '<div class="story">' + s.story.map((x, k) => '<div class="line' + (k === 0 ? ' show' : '') + '" data-say="' + esc(x) + '">' + esc(x) + '</div>').join('') + '</div>';
      if (s.story.length > 1) body += '<button class="reveal" id="revealBtn">' + T.reveal + '</button>';
    }
    if (s.tip) body += '<div class="tip">💡 ' + esc(s.tip) + '</div>';
    const last = step === nSteps - 1;
    const nav = '<div class="nav"><button class="btn light" id="prevBtn"' + (step === 0 ? ' disabled' : '') + '>' + T.prev + '</button><button class="btn' + (last ? ' go' : '') + '" id="nextBtn">' + (last ? T.start : T.next) + '</button></div>';
    app.innerHTML = frame(dots() + '<article class="card enter" id="stepCard">' + body + '</article>' + nav);
    bindStep(s);
  }

  function bindStep(s) {
    $('sayStep').addEventListener('click', () => { sPop(); speak(sayOf(s)); });
    const big = $('bigBtn');
    if (big) big.addEventListener('click', () => { sparkle(big); sPop(); speak(s.say || s.sub || s.big); });
    const total = (s.items || []).length;
    const mark = () => {
      const c = Object.keys(seen[step]).length;
      const m = $('meter'); if (m) m.style.width = (total ? (c / total) * 100 : 0) + '%';
      if (total && c === total) $('nextBtn').classList.add('glow');
    };
    document.querySelectorAll('.item').forEach((b) => {
      const j = b.dataset.j;
      if (seen[step][j]) b.classList.add('seen-on');
      b.addEventListener('click', () => {
        b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit');
        const first = !seen[step][j];
        seen[step][j] = 1; b.classList.add('seen-on'); sparkle(b); sPop(); speak(b.dataset.say);
        mark();
        if (first && Object.keys(seen[step]).length === total) setTimeout(sOk, 350);
      });
    });
    mark();
    document.querySelectorAll('.list li, .line').forEach((el) => el.addEventListener('click', () => { sPop(); speak(el.dataset.say); }));
    const rb = $('revealBtn');
    if (rb) {
      const lines = document.querySelectorAll('.line');
      speak(lines[0].dataset.say);
      rb.addEventListener('click', () => {
        const hidden = Array.from(lines).find((l) => !l.classList.contains('show'));
        if (hidden) { hidden.classList.add('show'); sPop(); speak(hidden.dataset.say); hidden.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        if (!Array.from(lines).some((l) => !l.classList.contains('show'))) { rb.remove(); $('nextBtn').classList.add('glow'); }
      });
    }
    $('prevBtn').addEventListener('click', () => { if (step > 0) { step--; renderStep(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    $('nextBtn').addEventListener('click', () => {
      sPop();
      if (step < nSteps - 1) { step++; renderStep(); window.scrollTo({ top: 0, behavior: 'smooth' }); } else startGame();
    });
  }

  /* ---------- GAME phase ---------- */
  let qi = 0, firstTry = 0, mistakes = 0, qWrong = false, locked = false;
  const questions = lesson.q;

  function startGame() { qi = 0; firstTry = 0; mistakes = 0; renderQuestion(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function renderQuestion() {
    const q = questions[qi];
    qWrong = false; locked = false;
    const opts = shuffle(q.o);
    const pos = (qi / questions.length);
    let h = '<div class="track" aria-hidden="true"><div class="rail"></div><div class="rocket" id="rocket" style="inset-inline-start:calc(8px + (100% - 64px) * ' + pos + ')">🚀</div><div class="flag">🏆</div></div>';
    h += '<div class="qno"><span>' + T.q(qi, questions.length) + '</span><span class="stars-line" aria-label="stars">' + '⭐'.repeat(firstTry) + '</span></div>';
    h += '<article class="card enter"><div class="mascot-row"><div class="mascot" aria-hidden="true">🧸</div><div class="bubble"><div class="qtext">' + esc(q.q) + '</div><button class="say" id="sayQ">' + T.listen.replace(ar ? 'الشرح' : '', '') + '</button></div></div>';
    h += '<div class="opts">' + opts.map((o) => '<button class="opt" data-v="' + esc(o) + '">' + esc(o) + '</button>').join('') + '</div><div class="fb" id="fb" aria-live="polite"></div></article>';
    app.innerHTML = frame(h);
    $('sayQ').addEventListener('click', () => { sPop(); speak(q.q); });
    document.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => answer(b, q)));
  }

  function answer(b, q) {
    if (locked) return;
    const ok = b.dataset.v === q.a;
    const fb = $('fb');
    if (ok) {
      locked = true;
      b.classList.add('right');
      document.querySelectorAll('.opt').forEach((x) => { if (x !== b) x.classList.add('dim'); });
      if (!qWrong) firstTry++;
      fb.textContent = pick(T.good); fb.className = 'fb good';
      sOk(); sparkle(b); confetti(14);
      const r = $('rocket'); if (r) r.style.insetInlineStart = 'calc(8px + (100% - 64px) * ' + (qi + 1) / questions.length + ')';
      setTimeout(() => {
        qi++;
        if (qi < questions.length) renderQuestion(); else finish();
      }, 1400);
    } else {
      qWrong = true; mistakes++;
      b.classList.add('wrong'); b.disabled = true;
      fb.textContent = pick(T.again); fb.className = 'fb bad'; sNo();
    }
  }

  /* ---------- REWARD phase ---------- */
  function stickerFor() {
    for (const s of lesson.steps) for (const it of s.items || []) if (it[0] && it[0].length <= 5 && it[0] !== '💬') return [it[0], it[1]];
    return ['🌟', lesson.t];
  }
  function nextLessonUrl() {
    let u = ui, l = li + 1;
    if (l >= course.units[u].length) { u++; l = 0; }
    if (u >= course.units.length) return null;
    return 'lesson.html?c=' + encodeURIComponent(cid) + '&u=' + u + '&l=' + l;
  }
  function finish() {
    const ratio = firstTry / questions.length;
    const stars = ratio >= 0.99 ? 3 : ratio >= 0.5 ? 2 : 1;
    const prog = store.get('bt.progress', {});
    const prev = prog[lid] ? prog[lid].stars || 0 : 0;
    prog[lid] = { stars: Math.max(prev, stars), at: Date.now() };
    store.set('bt.progress', prog);
    const st = stickerFor();
    const album = store.get('bt.stickers', []);
    const isNew = !album.some((x) => x.id === lid);
    if (isNew) { album.push({ id: lid, e: st[0], n: st[1] }); store.set('bt.stickers', album); }
    refreshHud();
    const nu = nextLessonUrl();
    let h = '<article class="card reward enter"><div class="trophy" aria-hidden="true">🏆</div><h2 style="margin:4px 0">' + esc(pick(T.win)) + '</h2>';
    h += '<div class="stars" id="rs" aria-label="' + stars + ' ' + T.stars + '"><span>⭐</span><span>⭐</span><span>⭐</span></div>';
    h += '<div class="sticker" aria-live="polite"><span class="em">' + esc(st[0]) + '</span><div><small>' + (isNew ? T.got : T.sticker) + '</small><b style="font-size:1.2rem">' + esc(st[1]) + '</b></div></div>';
    h += '<div class="actions"><button class="btn go" id="again">' + T.replay + '</button>' + (nu ? '<a class="btn" href="' + nu + '">' + T.nextLesson + '</a>' : '<div class="chip">' + T.allDone + '</div>') + '<a class="btn light" href="' + esc($('backLink').href) + '">' + T.toList + '</a></div></article>';
    app.innerHTML = frame(h);
    document.querySelectorAll('#rs span').forEach((s, i) => { if (i < stars) setTimeout(() => { s.classList.add('on'); sOk(); }, 500 + i * 450); });
    setTimeout(() => { sWin(); confetti(46); }, 300);
    $('again').addEventListener('click', () => { step = 0; renderStep(); window.scrollTo({ top: 0 }); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderStep();
})();
