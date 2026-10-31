/* KG1 English — first term. Order matches the curriculum map in kg1.html. */
(function () {
  const BT = window.BT, K = BT.kit;
  const PH = [
    { U: 'T', l: 't', words: [['🚂', 'train'], ['🧸', 'toys'], ['🐢', 'turtle']] },
    { U: 'I', l: 'i', t: 'Phonics: Ii — in, insect, ink', words: [['📥', 'in'], ['🐛', 'insect'], ['✒️', 'ink']] },
    { U: 'S', l: 's', words: [['⭐', 'star'], ['☀️', 'sun'], ['🏫', 'school']] },
    { U: 'A', l: 'a', t: 'Phonics: Aa — apple, ant', words: [['🍎', 'apple'], ['🐜', 'ant'], ['🐊', 'alligator']] },
    { U: 'N', l: 'n', words: [['🪺', 'nest'], ['🌙', 'night'], ['🔢', 'numbers']] },
    { U: 'P', l: 'p', words: [['🖊️', 'pen'], ['👖', 'pants'], ['🍳', 'pan']] },
    { U: 'H', l: 'h', words: [['❤️', 'heart'], ['🍯', 'honey'], ['🚁', 'helicopter']] },
    { U: 'D', l: 'd', words: [['🐶', 'dog'], [null, 'desk'], ['👗', 'dress']] },
    { U: 'R', l: 'r', words: [['🐰', 'rabbit'], ['🤖', 'robot'], ['🍚', 'rice']] },
    { U: 'E', l: 'e', words: [['🥚', 'egg'], ['🦅', 'eagle'], ['🐘', 'elephant']] },
    { U: 'C', l: 'c', words: [['🐄', 'cow'], ['☁️', 'cloud'], ['🧢', 'cap']] },
    { U: 'K', l: 'k', words: [['🥝', 'kiwi'], ['⚽', 'kick'], ['🪁', 'kite']] },
    { U: 'M', l: 'm', words: [['👩', 'mom'], ['👨', 'man'], ['🟤', 'mud']] },
  ];
  const ph = {};
  PH.forEach((P, i) => (ph[P.U] = K.phonicsEn(P, i, PH)));
  const P = (u) => ph[u];
  const V = K.vocabEn, C = K.colorEn;

  const numShape = (o) => ({
    t: o.t,
    goal: o.goal,
    steps: [
      { h: 'Numbers', big: o.big, sub: o.sub, p: o.pNum, say: o.say, items: o.count },
      { h: 'Shapes', p: o.pShape, items: o.shapes },
    ],
    q: o.q,
  });
  const apples = (n) => '🍎'.repeat(n);

  /* Unit 1 — Meet and Greet! */
  const u1 = [
    V({ t: 'Vocabulary: hello, good morning, goodbye', goal: 'I can greet people and say goodbye.', items: [['👋', 'hello'], ['🌞', 'good morning'], ['🤚', 'goodbye']], sentences: ['Hello! I am Sara.', 'Good morning, teacher!', 'Goodbye, friends!'], extraQ: [{ q: 'What do we say in the morning? 🌞', o: ['Good morning', 'Goodbye', 'Sorry'], a: 'Good morning' }] }),
    V({ t: 'Vocabulary: boy, girl, friends', goal: 'I can name a boy, a girl and friends.', items: [['👦', 'boy'], ['👧', 'girl'], ['🧑‍🤝‍🧑', 'friends']], sentences: ['I am a boy.', 'I am a girl.', 'We are friends.'] }),
    V({ t: 'Feelings: happy, sad', goal: 'I can say how I feel.', items: [['😊', 'happy'], ['😢', 'sad']], sentences: ['I am happy.', 'I am sad.', 'Are you happy?'], extraQ: [{ q: 'Which face is sad?', o: ['😢', '😊'], a: '😢' }] }),
    P('T'),
    P('I'),
    numShape({ t: 'Math: number 1 and circle', goal: 'I can say number 1 and find a circle.', big: '1', sub: 'one', pNum: 'This is number 1. One sun. One nose. One head!', say: 'One. Number one.', count: [['☀️', 'one sun', '1'], ['👃', 'one nose', '1']], pShape: 'A circle is round like a ball. It has no corners.', shapes: [['⭕', 'circle'], ['⚽', 'ball', 'a circle shape'], ['🕐', 'clock', 'a circle shape']], q: [{ q: 'How many suns? ☀️', o: ['1', '2', '3'], a: '1' }, { q: 'Which is a circle?', o: ['⭕ circle', '🟦 square', '🔺 triangle'], a: '⭕ circle' }, { q: 'Which is number 1?', o: ['1', '2', '3'], a: '1' }] }),
    C({ t: 'Color: red', name: 'red', ar: 'أحمر', items: [['🍎', 'apple'], ['❤️', 'heart'], ['🍓', 'strawberry']], project: 'Find three red things in your home or classroom and show them to a friend.' }),
  ];

  /* Unit 2 — I Can Find It at School! */
  const u2 = [
    V({ t: 'Vocabulary: classroom, teacher, chair, desk, board', goal: 'I can name things in my classroom.', items: [['🏫', 'classroom'], ['👩‍🏫', 'teacher'], ['🪑', 'chair'], [null, 'desk'], ['🟩', 'board']], sentences: ['This is my classroom.', 'She is my teacher.', 'I sit on a chair.'] }),
    V({ t: 'Vocabulary: book, pencil, eraser, crayon', goal: 'I can name my school tools.', items: [['📖', 'book'], ['✏️', 'pencil'], [null, 'eraser'], ['🖍️', 'crayon']], sentences: ['I have a book.', 'I have a pencil.', 'I draw with a crayon.'] }),
    V({ t: 'Vocabulary: playground, swing, slide', goal: 'I can name places and things to play with at school.', items: [['⚽', 'playground'], [null, 'swing'], ['🛝', 'slide']], sentences: ['I play in the playground.', 'I go on the slide.', 'I like the swing.'], extraQ: [{ q: 'Where do we play at school?', o: ['playground', 'classroom', 'kitchen'], a: 'playground' }] }),
    P('S'),
    P('A'),
    P('N'),
    numShape({ t: 'Math: number 2 and square', goal: 'I can say number 2 and find a square.', big: '2', sub: 'two', pNum: 'This is number 2. Two eyes. Two ears. Two hands!', say: 'Two. Number two.', count: [['👀', 'two eyes', '2'], ['👂', 'two ears', '2']], pShape: 'A square has four equal sides and four corners.', shapes: [['🟦', 'square'], ['🧊', 'box', 'a square shape'], ['🪟', 'window', 'a square shape']], q: [{ q: 'How many eyes? 👀', o: ['1', '2', '3'], a: '2' }, { q: 'Which is a square?', o: ['🟦 square', '⭕ circle', '🔺 triangle'], a: '🟦 square' }, { q: 'Which is number 2?', o: ['2', '1', '3'], a: '2' }] }),
    C({ t: 'Color: blue · Project: school bag', name: 'blue', ar: 'أزرق', items: [['🌊', 'sea'], ['🫐', 'blueberries'], ['🦋', 'butterfly']], project: 'Project: decorate a paper school bag with blue and red.' }),
  ];

  /* Unit 3 — My Body, My Care! */
  const u3 = [
    V({ t: 'Vocabulary: hair, face, eyes, ears, nose, mouth', goal: 'I can name the parts of my face.', items: [['💇', 'hair'], ['🙂', 'face'], ['👀', 'eyes'], ['👂', 'ears'], ['👃', 'nose'], ['👄', 'mouth']], sentences: ['I have two eyes.', 'I smell with my nose.', 'I talk with my mouth.'] }),
    V({ t: 'Vocabulary: teeth, arms, hands, legs, feet', goal: 'I can name more parts of my body.', items: [['🦷', 'teeth'], ['💪', 'arms'], ['🖐️', 'hands'], ['🦵', 'legs'], ['🦶', 'feet']], sentences: ['I brush my teeth.', 'I clap my hands.', 'I walk with my legs.'] }),
    P('P'),
    P('H'),
    P('D'),
    P('R'),
    numShape({ t: 'Math: number 3 and star', goal: 'I can say number 3 and find a star.', big: '3', sub: 'three', pNum: 'This is number 3. Three apples. Three stars!', say: 'Three. Number three.', count: [['🍎🍎🍎', 'three apples', '3'], ['⭐⭐⭐', 'three stars', '3']], pShape: 'A star has five points. We see stars in the night sky.', shapes: [['⭐', 'star'], ['🌟', 'bright star'], ['🌠', 'shooting star']], q: [{ q: 'How many apples? 🍎🍎🍎', o: ['2', '3', '4'], a: '3' }, { q: 'Which is a star?', o: ['⭐ star', '⭕ circle', '🟦 square'], a: '⭐ star' }, { q: 'Which is number 3?', o: ['3', '1', '2'], a: '3' }] }),
    C({ t: 'Color: yellow · Face parts project', name: 'yellow', ar: 'أصفر', items: [['🍌', 'banana'], ['🌻', 'sunflower'], ['🐥', 'chick']], project: 'Project: draw a face and name its parts: eyes, nose, mouth, ears.' }),
  ];

  /* Unit 4 — My Family Picnic! */
  const u4 = [
    V({ t: 'Vocabulary: grandfather, grandmother, father, mother', goal: 'I can name my family.', items: [['👴', 'grandfather'], ['👵', 'grandmother'], ['👨', 'father'], ['👩', 'mother']], sentences: ['This is my mother.', 'This is my father.', 'I love my grandmother.'] }),
    V({ t: 'Vocabulary: sister, brother, garden, tree, flower, grass', goal: 'I can name my brother, sister and things in the garden.', items: [['👧', 'sister'], ['👦', 'brother'], [null, 'garden'], ['🌳', 'tree'], ['🌸', 'flower'], ['🌱', 'grass']], sentences: ['This is my sister.', 'I play in the garden.', 'I see a tree and a flower.'] }),
    V({ t: 'Vocabulary: fruits, chocolate, chips, juice, sandwich', goal: 'I can name food at a picnic.', items: [['🍇', 'fruits'], ['🍫', 'chocolate'], ['🍟', 'chips'], ['🧃', 'juice'], ['🥪', 'sandwich']], sentences: ['I like juice.', 'I eat a sandwich.', 'We have fruits at the picnic.'] }),
    P('E'),
    P('C'),
    P('K'),
    P('M'),
    numShape({ t: 'Math: numbers 4 and 5; heart and triangle', goal: 'I can say numbers 4 and 5 and find a heart and a triangle.', big: '4 5', sub: 'four · five', pNum: 'Four balloons. Five fingers on one hand!', say: 'Four. Five.', count: [['🎈🎈🎈🎈', 'four balloons', '4'], ['🖐️', 'five fingers', '5']], pShape: 'A heart shows love. A triangle has three corners.', shapes: [['❤️', 'heart'], ['🔺', 'triangle'], ['⛰️', 'mountain', 'a triangle shape']], q: [{ q: 'How many balloons? 🎈🎈🎈🎈', o: ['3', '4', '5'], a: '4' }, { q: 'How many fingers on one hand? 🖐️', o: ['4', '5', '6'], a: '5' }, { q: 'Which is a triangle?', o: ['🔺 triangle', '❤️ heart', '⭕ circle'], a: '🔺 triangle' }, { q: 'Which is a heart?', o: ['❤️ heart', '🔺 triangle'], a: '❤️ heart' }] }),
    C({ t: 'Colors: green and orange · Family tree project', name: 'green', ar: 'أخضر · برتقالي', items: [['🐸', 'frog', 'green'], ['🥒', 'cucumber', 'green'], ['🍊', 'orange', 'orange']], project: 'Project: make a family tree. Draw a tree and put a picture of each family member on it.' }),
  ];

  BT.courses['kg1-en'] = { lang: 'en', title: 'English — KG1', units: [u1, u2, u3, u4] };
})();
