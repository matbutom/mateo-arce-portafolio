let miTypo;

let lineas = [
  "auto",
  "polle",
  "sis"
];

let mascara;
let datosLetras = [];

let tamanoLetra = 145;
let espacioX = 72;
let espacioY = 125;

let separacionPuntos = 6;

let anchoElipse = 12;
let altoElipse = 12;

let radioOrbita = 5;
let velocidadOrbita = 0.1;

async function setup() {
  createCanvas(420, 420);
  pixelDensity(20);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  // crear la máscara invisible
  mascara = createGraphics(
    width,
    height
  );

  mascara.pixelDensity(1);
  mascara.textFont(miTypo);
  mascara.textSize(tamanoLetra);
  mascara.textAlign(CENTER, CENTER);
  mascara.noStroke();
  mascara.fill(255);

  // recorrer las tres líneas
  for (
    let fila = 0;
    fila < lineas.length;
    fila++
  ) {
    let linea = lineas[fila];

    // recorrer los caracteres de cada línea
    for (
      let columna = 0;
      columna < linea.length;
      columna++
    ) {
      let caracter = linea[columna];

      let posicionX =
        width / 2 +
        (columna - (linea.length - 1) / 2) * espacioX;

      let posicionY = height / 2 + (fila - 1) * espacioY;

      mascara.clear();

      mascara.text(caracter, posicionX, posicionY);

      mascara.loadPixels();

      let puntos = [];

      // buscar puntos dentro del relleno
      for (
        let y = 0;
        y < height;
        y = y + separacionPuntos
      ) {
        for (
          let x = 0;
          x < width;
          x = x + separacionPuntos
        ) {
          let indicePixel =
            4 * (x + y * width);

          let opacidad =
            mascara.pixels[
              indicePixel + 3
            ];

          if (opacidad > 100) {
            puntos.push({
              x: x,
              y: y,

              // cada elipse comienza en un ángulo diferente
              angulo: random(TWO_PI),

              // variar ligeramente la velocidad
              velocidad: random(
                0.7,
                1.3
              ),

              // variar ligeramente el radio
              radio: random(
                radioOrbita * 0.5,
                radioOrbita
              )
            });
          }
        }
      }

      datosLetras.push({
        puntos: puntos
      });
    }
  }
}

function draw() {
  background("#ee9be7");

  fill(255);
  stroke(0);
  strokeWeight(1);

  // recorrer todas las letras
  for (
    let i = 0;
    i < datosLetras.length;
    i++
  ) {
    let letra = datosLetras[i];

    // recorrer las elipses de cada letra
    for (
      let j = 0;
      j < letra.puntos.length;
      j++
    ) {
      let punto = letra.puntos[j];

      punto.angulo +=
        velocidadOrbita *
        punto.velocidad;

      // calcular la posición alrededor del punto original
      let movimientoX =
        cos(punto.angulo) *
        punto.radio;

      let movimientoY =
        sin(punto.angulo) *
        punto.radio;

      push();

      translate(
        punto.x + movimientoX,
        punto.y + movimientoY
      );

      // hacer que la elipse también gire
      rotate(punto.angulo);

      ellipse(
        0,
        0,
        anchoElipse,
        altoElipse
      );

      pop();
    }
  }
}