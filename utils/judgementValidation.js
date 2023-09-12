const judgementRPS = (p1, p2) => {
  let p1Finale;
  let p2Finale;

  if (
    (p1 === 'batu' && p2 === 'batu')
    || (p1 === 'kertas' && p2 === 'kertas')
    || (p1 === 'gunting' && p2 === 'gunting')
  ) {
    p1Finale = 'draw';
    p2Finale = 'draw';
  } else if (
    (p1 === 'batu' && p2 === 'gunting')
    || (p1 === 'kertas' && p2 === 'batu')
    || (p1 === 'gunting' && p2 === 'kertas')
  ) {
    p1Finale = 'win';
    p2Finale = 'lose';
  } else if (
    (p1 === 'batu' && p2 === 'kertas')
    || (p1 === 'kertas' && p2 === 'gunting')
    || (p1 === 'gunting' && p2 === 'batu')
  ) {
    p1Finale = 'lose';
    p2Finale = 'win';
  }

  return [p1Finale, p2Finale];
};
const vsCom = () => {
  const com = ['batu', 'kertas', 'gunting'];
  const random = Math.floor(Math.random() * com.length);
  return com[random];
};

module.exports = { judgementRPS, vsCom };
