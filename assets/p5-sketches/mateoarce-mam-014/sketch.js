let miTypoRegular;
let miTypoBold;

let lineas = [
  "auto",
  "polle",
  "sis"
];

let mascara;
let datosLetras = [];

let tamanoLetra = 200;
let espacioX = 72;
let espacioY = 125;

let separacionAscii = 7;
let tamanoAscii = 15;

let radioMouse = 55;

// delay de la animación
let retrasoMaximo = 200;
let suavidad = 0.12;

async function setup() {
  createCanvas(420, 420);
  pixelDensity(2);

  miTypoRegular = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  miTypoBold = await loadFont(
    "assets/IBMPlexMono-Bold.ttf"
  );

  // crear la máscara invisible
  mascara = createGraphics(
    width,
    height
  );

  mascara.pixelDensity(1);
  mascara.textFont(miTypoRegular);
  mascara.textSize(tamanoLetra);
  mascara.textAlign(CENTER, CENTER);
  mascara.noStroke();
  mascara.fill(255);

  // recorrer las líneas
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
        (
          columna -
          (linea.length - 1) / 2
        ) * espacioX;

      let posicionY =
        height / 2 +
        (fila - 1) * espacioY;

      mascara.clear();

      mascara.text(
        caracter,
        posicionX,
        posicionY
      );

      mascara.loadPixels();

      let puntos = [];

      // buscar posiciones dentro de la letra
      for (
        let y = 0;
        y < height;
        y += separacionAscii
      ) {
        for (
          let x = 0;
          x < width;
          x += separacionAscii
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
              intensidad: 0,
              objetivo: 0,
              objetivoAnterior: 0,
              inicioCambio: 0
            });
          }
        }
      }

      datosLetras.push({
        caracter: caracter,
        puntos: puntos
      });
    }
  }
}

function draw() {
  background("#ee9be7");

  noStroke();
  textSize(tamanoAscii);
  textAlign(CENTER, CENTER);

  // recorrer todas las letras grandes
  for (
    let i = 0;
    i < datosLetras.length;
    i++
  ) {
    let letra = datosLetras[i];

    // recorrer sus caracteres pequeños
    for (
      let j = 0;
      j < letra.puntos.length;
      j++
    ) {
      let punto = letra.puntos[j];

      let distancia = dist(
        mouseX,
        mouseY,
        punto.x,
        punto.y
      );

      // decidir si el punto debe ser bold
      if (distancia < radioMouse) {
        punto.objetivo = 1;
      } else {
        punto.objetivo = 0;
      }

      // preparar el retraso cuando cambia el objetivo
      if (
        punto.objetivo !==
        punto.objetivoAnterior
      ) {
        let retraso = map(
          constrain(
            distancia,
            0,
            radioMouse
          ),
          0,
          radioMouse,
          0,
          retrasoMaximo
        );

        punto.inicioCambio =
          millis() + retraso;

        punto.objetivoAnterior =
          punto.objetivo;
      }

      // comenzar la transición después del retraso
      if (
        millis() >=
        punto.inicioCambio
      ) {
        punto.intensidad = lerp(
          punto.intensidad,
          punto.objetivo,
          suavidad
        );
      }

      // dibujar la versión regular
      textFont(miTypoRegular);

      fill(
        0,
        255 *
        (1 - punto.intensidad)
      );

      text(
        letra.caracter,
        punto.x,
        punto.y
      );

      // dibujar la versión bold
      textFont(miTypoBold);

      fill(
        0,
        255 *
        punto.intensidad
      );

      text(
        letra.caracter,
        punto.x,
        punto.y
      );
    }
  }
}