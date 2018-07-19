let slider, sChoice;
let myDiv;
let checkBox;
const RESOLUCAO = 20;
const ITERACOES = 20;

function setup() {
  createCanvas(600, 600);
  myDiv = createDiv('This has some text');
  myDiv2 = createDiv('This has more text');
  slider = createSlider(0, ITERACOES, 10, 1);
  sChoice = createSlider(1,3, 3, 1);
  checkBox = createCheckbox('Habilitar extra', false);
}



function draw() {

  //Pre-configuration
  background(255);
  rectMode(CENTER);
  translate(width / 2, height / 2);

  // Axis
  strokeWeight(3);
  stroke(0);
  line(width / 2,  0,  -width /2 , 0);  // X-axis
  line(0, height / 2, 0, -height / 2);  // Y-axis

  // Curves
  strokeWeight(5);
  if(sChoice.value() == 1){
    myDiv.html(`Sou o seno sendo aproximado com ${slider.value()} iteracoes de Taylor<br>`);

    // Desenha seno e sua aproximação
    stroke(210, 0, 255);
    sine();
    stroke(slider.value() * (210 / ITERACOES), 0, slider.value() * (255 / ITERACOES));
    mySine();

    // Verifica extra sobre o seno hiperbólico
    if (checkBox.checked()){
      myDiv2.html(`Temos o seno hiperbolico sendo aproximado com a mesma quantidade de iteracoes, desenhado em azul`);
      stroke(0, 0, slider.value() * (255 / ITERACOES));
      myHsine();
    } else {
      myDiv2.html('');
    }

  } else if(sChoice.value() == 2){
    myDiv.html(`Sou o cosseno sendo aproximado com ${slider.value()} iteracoes de Taylor<br>`);

    // Desenha cosseno e sua aproximação
    stroke(255, 0, 180);
    cosine();
    stroke(slider.value() * (255 / ITERACOES), 0, slider.value() * (180 / ITERACOES));
    myCosine();

    // Verifica extra sobre o cosseno hiperbólico
    if (checkBox.checked()){
      myDiv2.html(`Temos o cosseno hiperbolico sendo aproximado com a mesma quantidade de iteracoes, desenhado em vermelho`);
      stroke(slider.value() * (255 / ITERACOES), 0, 0);
      myHcosine();
    } else {
      myDiv2.html('');
    }

  } else {
    myDiv.html(`Sou o expoente natural sendo aproximado com ${slider.value()} iteracoes de Taylor<br>`);

    // Desenha e^x real e sua aproximação
    stroke(0, 255, 150);
    realExp();
    stroke(0, slider.value() * (255 / ITERACOES), slider.value() * (255 / ITERACOES));
    myExp();

    // Verifica extra sobre o ln de x + 1
    if (checkBox.checked()){
      myDiv2.html(`Temos <code> ln(1+x) | x < 1 </code> sendo aproximado com a mesma quantidade de iteracoes, desenhado em verde`);
      stroke(0, slider.value() * (255 / ITERACOES), 0);
      myLn();
    } else {
      myDiv2.html('');
    }
  }
}

// CALCULANDO O SENO
function mySine(){
  for(let x = -20; x <= 20; x+=0.01){

    let y=0;
    for(let n=1; n<=slider.value(); n++){
      y += pow(-1, n) / factorial((2*n) + 1) * pow(x, (2*n) + 1);
    }

    let newX = x * RESOLUCAO;
    let newY = y * -RESOLUCAO;
    point(newX, newY - newX);
  }
}

function myHsine(){
  for(let x = -20; x <= 20; x+=0.01){

    let y=0;
    for(let n=1; n<=slider.value(); n++){
      y += pow(x, (2*n) + 1) / factorial((2*n) + 1);
    }

    let newX = x * RESOLUCAO;
    let newY = y * -RESOLUCAO;
    point(newX, newY - newX);
  }
}

function sine(){
  for(let x = -20; x <= 20; x+=0.01){
    let y = sin(x);
    if (y>=-300 && y<=300){
      let newX = x * RESOLUCAO;
      let newY = y * -RESOLUCAO;
      point(newX, newY);
    }
  }
}


// CALCULANDO O COSSENO
function myCosine(){
  let y=0;
  for(let x = -20; x <= 20; x+=0.01){
    for(let n=1; n<=slider.value(); n++){
      y += (pow(-1, n) / factorial(2 * n)) * pow(x, 2 * n);
    }

    let newX = x * RESOLUCAO;
    let newY = (y + 1) * - RESOLUCAO;
    point(newX, newY);
    y=0;
  }
}

function myHcosine(){
  let y=0;
  for(let x = -20; x <= 20; x+=0.01){
    for(let n=1; n<=slider.value(); n++){
      y += pow(x, 2 * n) / factorial(2 * n);
    }

    let newX = x * RESOLUCAO;
    let newY = (y + 1) * - RESOLUCAO;
    point(newX, newY);
    y=0;
  }
}

function cosine(){
  for(let x = -20; x <= 20; x+=0.01){
    let y = cos(x);
    if (y>=-300 && y<=300){
      let newX = x * RESOLUCAO;
      let newY = y * (-RESOLUCAO + 1);
      point(newX, newY);
    }
  }
}

// CALCULANDO O EXPOENTE
function myExp(){
  let y=0;
  for(let x = -20; x <= 20; x+=0.01){

    y=0;
    for(let n=1; n<=slider.value(); n++){
      let somaAtual = pow(x, n) / factorial(n);
      y += somaAtual;
    }

    let newX = (x + 3.7) *   RESOLUCAO;
    let newY = (y + 1  ) * - RESOLUCAO;
    point(newX, newY);

  }
}

function myLn(){
  let y=0;
  for(let x = -20; x <= 20; x+=0.01){

    y=0;
    for(let n=1; n<=slider.value(); n++){
      let somaAtual = pow(-1, n) / (n + 1) * pow(x, n + 1);
      y += somaAtual;
    }

    let newX = x *   RESOLUCAO;
    let newY = y * - RESOLUCAO;
    if (newX < 1)
      point(newX, newY - newX);

  }
}

function realExp(){
  for(let x = -20; x <= 20; x+=0.01){
    let y = exp(x);
    if (y>=-300 && y<=300){
      let newX = (x + 3.7) *   RESOLUCAO;
      let newY = y         * - RESOLUCAO;
      point(newX, newY);
    }
  }
}



// FUNÇÃO FATORIAL AUXILIAR
function factorial(num)
{
    return num == 1 ? 1 : num * factorial(num-1);
}
