let miTypo;
let palabra = "autopollesis";
let letras = [];

async function setup() {
  createCanvas(420, 420);

  // https://p5js.org/reference/p5/loadfont/
  // await significa espera a que esto termine antes de seguir
  // nunca lo había usado lol, es de la v2
  
  miTypo = await loadFont("assets/IBMPlexMono-Regular.ttf");
  textFont(miTypo);
  textSize(24);

  // split()
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

  letras = palabra.split("");
}

function draw() {
  background("#ee9be7");

  fill(20);

  for (let i = 0; i < palabra.length; i++) {
    
    let letra = palabra[i];

    let x = random(width);
    let y = random(height);

    text(letra, x, y);
  }
}
