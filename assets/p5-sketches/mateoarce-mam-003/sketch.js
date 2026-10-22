let miTypo;
let palabra = "autopollesis";
let indice = 0;
let caracteres = [];

async function setup() {
  createCanvas(420, 420);
  background("#ee9be7");

  miTypo = await loadFont("assets/IBMPlexMono-Regular.ttf");
  textFont(miTypo);
  textSize(24);

  // crear cada letra una detrás de la otra

  for (let i = 0; i < palabra.length; i++) {
    caracteres.push(palabra[i]);
  }
}

function draw() {

}

// mouseMoved();
// https://p5js.org/reference/p5/mouseMoved/

function mouseMoved() {
  text(palabra[indice], mouseX, mouseY);

  indice = indice + 1;

  if (indice >= palabra.length) {
    indice = 0;
  }
}

function mousePressed() {
  background("#ee9be7");
  indice = 0;
}
