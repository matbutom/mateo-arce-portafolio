let miTypo;

let margen = 300;
let velocidad = 0.03;

let poema = [
  ["autopollesis", "se", "escribe", "mientras", "se", "inventa"],
  ["una", "palabra", "respira", "dentro", "de", "otra"],
  ["cada", "letra", "recuerda", "el", "gesto", "anterior"],
  ["pero", "al", "repetirlo", "también", "lo", "transforma"],
  ["nada", "la", "crea", "desde", "afuera"],
  ["su", "forma", "nace", "del", "mismo", "movimiento"],
  ["es", "un", "cuerpo", "leyendo", "sus", "propios", "bordes"],
  ["y", "volviendo", "a", "comenzar", "en", "cada", "lectura"]
];

async function setup() {
  createCanvas(420, 420);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  textFont(miTypo);
  textSize(18);
  textAlign(LEFT, CENTER);
}

function draw() {
  background("#ee9be7");

  fill("#222222");
  noStroke();

  // distribuir las líneas usando la altura del canvas
  let espacioVertical =
    (height - margen * 2) / poema.length;

  for (let i = 0; i < poema.length; i++) {
    let y =
      margen +
      espacioVertical * i +
      espacioVertical / 2;

    // crear un movimiento entre el borde y el centro
    let movimiento =
      (
        sin(
          frameCount * velocidad +
          i * 0.45
        ) +
        1
      ) / 2;

    dibujarLinea(
      poema[i],
      y,
      movimiento
    );
  }
}

function dibujarLinea(
  palabras,
  y,
  movimiento
) {
  let anchos = [];
  let anchoPalabras = 0;

  // medir cada palabra
  for (let i = 0; i < palabras.length; i++) {
    anchos[i] = textWidth(palabras[i]);

    anchoPalabras =
      anchoPalabras + anchos[i];
  }

  let posicionesBorde = [];
  let posicionesCentro = [];

  // calcular la posición justificada
  if (palabras.length > 1) {
    let espacioJustificado =
      (
        width -
        margen * 2 -
        anchoPalabras
      ) / (palabras.length - 1);

    let x = margen;

    for (let i = 0; i < palabras.length; i++) {
      posicionesBorde[i] = x;

      x =
        x +
        anchos[i] +
        espacioJustificado;
    }
  } else {
    posicionesBorde[0] =
      width / 2 - anchos[0] / 2;
  }

  // calcular las posiciones reunidas en el centro
  let espacioCentro = textWidth(" ");

  let anchoCentro =
    anchoPalabras +
    espacioCentro * (palabras.length - 1);

  let xCentro =
    width / 2 - anchoCentro / 2;

  for (let i = 0; i < palabras.length; i++) {
    posicionesCentro[i] = xCentro;

    xCentro =
      xCentro +
      anchos[i] +
      espacioCentro;
  }

  // mover y dibujar cada palabra
  for (let i = 0; i < palabras.length; i++) {
    let x = lerp(
      posicionesBorde[i],
      posicionesCentro[i],
      movimiento
    );

    text(
      palabras[i],
      x,
      y
    );
  }
}