let tipografiaRegular;
let tipografiaBold;

let colorFondo = "#ee9be7";

let estrofa = [
  ["autopollesis", "se", "escribe", "mientras", "se", "inventa"],
  ["una", "palabra", "respira", "dentro", "de", "otra"],
  ["cada", "letra", "recuerda", "el", "gesto", "anterior"],
  ["pero", "al", "repetirlo", "también", "lo", "transforma"]
];

let radios = [150, 120, 50, 180];

let velocidades = [
  0.010,
  -0.015,
  0.015,
  -0.025
];

async function setup() {
  createCanvas(420, 420);

  tipografiaRegular = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  tipografiaBold = await loadFont(
    "assets/IBMPlexMono-Bold.ttf"
  );

  textSize(13);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  background(colorFondo);

  let elementos = [];

  // calcular las posiciones de todas las palabras
  for (let linea = 0; linea < estrofa.length; linea++) {
    let palabras = estrofa[linea];
    let radioOriginal = radios[linea];

    let esBold = linea % 2 == 0;

    if (esBold) {
      textFont(tipografiaBold);
    } else {
      textFont(tipografiaRegular);
    }

    for (let i = 0; i < palabras.length; i++) {
      let separacion =
        TWO_PI / palabras.length;

      let angulo =
        i * separacion +
        frameCount * velocidades[linea];

      let radioActual = radioOriginal;

      // elegir algunas palabras para animarlas
      let palabraAnimada =
        (i + linea) % 2 == 0;

      if (palabraAnimada) {
        let movimiento =
          (
            sin(
              frameCount * 0.018 +
              i * 1.2 +
              linea
            ) +
            1
          ) / 2;

        radioActual = lerp(
          radioOriginal,
          radioOriginal * 0.45,
          movimiento
        );
      }

      let x =
        width / 2 +
        cos(angulo) * radioActual;

      let y =
        height / 2 +
        sin(angulo) * radioActual;

      elementos.push({
        palabra: palabras[i],
        x: x,
        y: y,
        esBold: esBold,
        ancho: textWidth(palabras[i]) + 12
      });
    }
  }

  // dibujar las líneas hacia las palabras regulares
  stroke(34, 34, 34, 130);
  strokeWeight(1);

  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].esBold == false) {
      line(
        width / 2,
        height / 2,
        elementos[i].x,
        elementos[i].y
      );
    }
  }

  // dibujar los rectángulos sobre las líneas
  noStroke();

  for (let i = 0; i < elementos.length; i++) {
    let elemento = elementos[i];

    if (elemento.esBold) {
      fill(255);
    } else {
      fill(colorFondo);
    }

    rect(
      elemento.x,
      elemento.y,
      elemento.ancho,
      24,
      2
    );
  }

  // dibujar las palabras sobre los rectángulos
  fill("#222222");

  for (let i = 0; i < elementos.length; i++) {
    let elemento = elementos[i];

    if (elemento.esBold) {
      textFont(tipografiaBold);
    } else {
      textFont(tipografiaRegular);
    }

    text(
      elemento.palabra,
      elemento.x,
      elemento.y
    );
  }

  // dibujar el punto central sobre las líneas
  fill("#222222");
  circle(width / 2, height / 2, 5);
}