/* BravoTen — lesson content kit: builds lesson objects from compact tables */
(function () {
  const BT = (window.BT = window.BT || { courses: {} });
  const PARENT_AR = 'للأهل: دعوا الطفل يتتبع الحرف بإصبعه في الهواء، ثم على الطاولة أو في الدقيق أو الرمل، قبل القلم. شجّعوه على كل محاولة ولا تستعجلوه.';
  const PARENT_EN = 'For parents: let your child trace the letter in the air, then on the table or in flour or sand, before using a pencil. Praise every try.';
  const at = (arr, i) => arr[((i % arr.length) + arr.length) % arr.length];

  /* ---------- Arabic letter lesson ---------- */
  function letterAr(L, i, ALL) {
    const others = ALL.filter((_, j) => j !== i);
    const o2 = [at(others, i).ch, at(others, i + 3).ch];
    const dw = [at(others, i).words[0], at(others, i + 4).words[1]];
    const lab = (w) => w[0] + ' ' + w[1];
    const W = L.words;
    const ex = L.extra;
    return {
      t: 'حرف ' + L.name,
      goal: 'أتعرّف على حرف ' + L.name + ' وشكله وصوته، وأميّزه في أول الكلمات وفي وسطها وآخرها.',
      steps: [
        { h: 'نلاحظ الحرف', big: L.ch, sub: L.h.join(' — '), p: 'هذا حرف ' + L.name + '. نسمع صوته ونكرره معًا: ' + L.h.join('، ') + '.', say: L.say + '. ' + L.h.join('، ') },
        { h: 'كلمات تبدأ بحرف ' + L.name, p: 'نضغط على الصورة لنسمع الكلمة، ثم ننطق أول صوت فيها.', items: W.map((w) => [w[0], w[1], 'أول الكلمة']) },
        { h: 'أشكال الحرف', p: 'يتغيّر شكل الحرف قليلًا حسب مكانه في الكلمة، لكنه نفس الحرف.', forms: L.forms },
        { h: 'الحرف في وسط الكلمة وآخرها', p: 'ننظر جيدًا ونجد الحرف في هذه الكلمة.', items: [[ex[0], ex[1], ex[2]]] },
        { h: 'نكتب الحرف', p: 'نرسم الحرف في الهواء، ثم على الطاولة، ثم على الورقة. نبدأ من النقطة ونتبع الاتجاه.', tip: PARENT_AR },
      ],
      q: [
        { q: 'اختر حرف ' + L.name, o: [L.ch].concat(o2), a: L.ch },
        { q: 'أي كلمة تبدأ بحرف ' + L.name + '؟', o: [lab(W[0]), lab(dw[0]), lab(dw[1])], a: lab(W[0]) },
        { q: 'ما الحرف الأول في كلمة ' + W[1][1] + ' ' + W[1][0] + '؟', o: [L.ch].concat(o2), a: L.ch },
        { q: 'أين نجد حرف ' + L.name + ' في كلمة ' + ex[1] + ' ' + ex[0] + '؟', o: ['أول الكلمة', 'وسط الكلمة', 'آخر الكلمة'], a: ex[2] },
      ],
    };
  }

  /* ---------- English phonics lesson ---------- */
  function phonicsEn(P, i, ALL) {
    const others = ALL.filter((_, j) => j !== i);
    const oU = [at(others, i).U, at(others, i + 4).U];
    const oL = [at(others, i).l, at(others, i + 4).l];
    const dw = [at(others, i).words[0], at(others, i + 5).words[1]];
    const lab = (w) => w[0] + ' ' + w[1];
    const W = P.words;
    return {
      t: P.t || 'Phonics: ' + P.U + P.l + ' — ' + P.words.map((w) => w[1]).join(', '),
      goal: 'I can say the sound of ' + P.U + P.l + ' and find it at the start of words.',
      steps: [
        { h: 'Meet the letter', big: P.U + P.l, sub: 'Capital ' + P.U + ' · small ' + P.l, p: 'This is the letter ' + P.U + '. It makes the sound /' + P.l + '/. Say it with me: ' + P.l + ', ' + P.l + ', ' + P.l + '!', say: P.U + '. ' + P.l + ', ' + P.l + ', ' + P.l + '.' },
        { h: 'Words that start with ' + P.l, p: 'Tap a picture to listen. Then say the first sound.', items: W.map((w) => [w[0], w[1], '/' + P.l + '/']) },
        { h: 'Trace the letter', p: 'Draw ' + P.U + ' and ' + P.l + ' in the air with your finger, then on paper.', tip: PARENT_EN },
      ],
      q: [
        { q: 'Which word starts with ' + P.U + '?', o: [lab(W[0]), lab(dw[0]), lab(dw[1])], a: lab(W[0]) },
        { q: 'Find the capital letter.', o: [P.U].concat(oU), a: P.U },
        { q: 'Find the small letter.', o: [P.l].concat(oL), a: P.l },
        { q: 'What is the first letter of “' + W[1][1] + '” ' + W[1][0] + '?', o: [P.U].concat(oU), a: P.U },
      ],
    };
  }

  /* ---------- English vocabulary lesson ---------- */
  const GLOBAL_WORDS = ['apple', 'book', 'sun', 'dog', 'car', 'tree', 'ball', 'cat'];
  function vocabEn(o) {
    const withPic = o.items.filter((x) => x[0]);
    const words = o.items.map((x) => x[1]);
    const qs = withPic.slice(0, 4).map((it, k) => {
      const pool = words.filter((w) => w !== it[1]).concat(GLOBAL_WORDS);
      return { q: 'Which word is ' + it[0] + '?', o: [it[1], at(pool, k), at(pool, k + 1)], a: it[1] };
    });
    (o.extraQ || []).forEach((x) => qs.push(x));
    return {
      t: o.t,
      goal: o.goal,
      steps: [
        { h: 'Listen and repeat', p: 'Tap each card to listen. Say the word out loud.', items: o.items.map((x) => [x[0] || '💬', x[1], x[2] || '']) },
        { h: 'Say it in a sentence', p: 'Now use the words in a sentence.', list: o.sentences.map((s) => ['💬', s]), say: o.sentences.join('. ') },
      ],
      q: qs,
    };
  }

  /* ---------- English colour lesson ---------- */
  const COLOR_DOT = { red: '🔴', blue: '🔵', yellow: '🟡', green: '🟢', orange: '🟠' };
  function colorEn(o) {
    const dots = Object.keys(COLOR_DOT);
    const lab = (c) => COLOR_DOT[c] + ' ' + c;
    const qs = o.items.map((it, k) => {
      const col = it[2] || o.name;
      const oth = dots.filter((c) => c !== col);
      return { q: 'What colour is the ' + it[1] + '? ' + it[0], o: [lab(col), lab(at(oth, k)), lab(at(oth, k + 2))], a: lab(col) };
    });
    return {
      t: o.t,
      goal: 'I can say the colour ' + o.name + ' and find ' + o.name + ' things.',
      steps: [
        { h: 'The colour ' + o.name, big: COLOR_DOT[o.name], sub: o.name + ' · ' + o.ar, p: 'This colour is ' + o.name + '. Say it with me: ' + o.name + '!', say: o.name },
        { h: o.name + ' things', p: 'Tap a card to listen.', items: o.items.map((x) => [x[0], x[1], x[2] || o.name]) },
        { h: 'Mini project', p: o.project, tip: o.parent || PARENT_EN },
      ],
      q: qs.slice(0, 3),
    };
  }

  BT.kit = { letterAr, phonicsEn, vocabEn, colorEn, PARENT_AR, PARENT_EN };
})();
