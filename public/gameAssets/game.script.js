const userChoices = document.querySelectorAll('.pilihan-player');
const comChoices = document.querySelectorAll('.pilihan-com')
const resetChoices = document.getElementById('reset');

const boxHasil = document.getElementById('statusss');
const versusBox = document.getElementById('result');

let hasilPlayer = "";
let hasilCom = "";

const disableClick = () => {
    userChoices.forEach((element) => element.classList.add('disableClick'));
};

function cekPemenang() {
  if ((hasilPlayer === 'player-batu' && hasilCom === 'com-batu')||(hasilPlayer === 'player-gunting' && hasilCom === 'com-gunting')||(hasilPlayer === 'player-kertas' && hasilCom === 'com-kertas')){
      boxHasil.innerText = 'DRAW';
      console.log('DRAW')
  } else if ((hasilPlayer === 'player-batu' && hasilCom === 'com-gunting')||(hasilPlayer === 'player-gunting' && hasilCom === 'com-kertas')||(hasilPlayer === 'player-kertas' && hasilCom === 'com-batu')){
      boxHasil.innerText = 'PLAYER 1 WIN';
      console.log('PLAYER 1 WIN')
  } else {boxHasil.innerText = 'COM \n WIN';
    console.log('COM WIN');
  }
};  

const randomCom = () => {
    const pilihanTersedia = ['com-batu','com-gunting','com-kertas'];
    const rndInt = Math.floor(Math.random() * 3);
    const pilihanCom = pilihanTersedia[rndInt];
    const comPilihan = document.getElementById(pilihanCom);
    hasilCom = pilihanCom;
    console.log("Computer memilih " + hasilCom);
    comPilihan.style.backgroundColor = 'red';
};

userChoices.forEach((choice) => {
    choice.onclick = () => {
        hasilPlayer = choice.id; 
        console.log("Player memilih " + hasilPlayer);
        choice.style.backgroundColor = 'grey';
        boxHasil.style.display = 'flex';
        versusBox.style.display = 'none';
        boxHasil.classList.add('statusss');
        randomCom();
        disableClick();
        cekPemenang();
        }
});

resetChoices.onclick = () => {
    userChoices.forEach((element) => {
      element.style.backgroundColor = '#9C835F';
      element.classList.remove('disableClick');
    });
    comChoices.forEach((element) => {
        element.classList.remove('disableClick');
        element.style.backgroundColor = '#9C835F';
      });
    boxHasil.style.display = 'none';
    versusBox.style.display = 'flex';
};