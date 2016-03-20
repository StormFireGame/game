import Firebase from 'firebase';

const ref = new Firebase('https://butuzgol-game.firebaseio.com/');

const data = [
  { ref: ref.child('tableExperience'), data: require('./bundles/table-experiences.json') },
  { ref: ref.child('heroImages'), data: require('./bundles/hero-images.json') },
  { ref: ref.child('islands'), data: require('./bundles/islands.json') },
  { ref: ref.child('skills'), data: require('./bundles/skills.json') },
  { ref: ref.child('things'), data: require('./bundles/things.json') },
  { ref: ref.child('heroes'), data: require('./bundles/heroes.json') },
];

data.forEach(async (item) => {
  await item.ref.remove();
  console.log('removed');
  await item.ref.set(item.data);
  console.log('inserted');
});
