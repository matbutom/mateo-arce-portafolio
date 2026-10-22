let miTypo;
let puntos = [];

async function setup() {
  createCanvas(420, 420, WEBGL);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  textFont(miTypo);
  textSize(500);
  textAlign(CENTER, CENTER);

  puntos = miTypo.textToPoints(
      "a", 0, -50,
    {
      sampleFactor: 0.15
    }
  );
}

function draw() {
  background("#ee9be7");

  orbitControl();

  push();

  // giro constante sobre el eje vertical
  rotateY(frameCount * 0.03);

  stroke("#222222");

  // crear capas en profundidad
  for (let z = -30; z <= 30; z = z + 5) {

    // recorrer todos los puntos de la A
    for (let i = 0; i < puntos.length; i++) {

      // crear una onda que avanza con el tiempo
      let onda = sin(
        frameCount * 0.05 +
        puntos[i].x * 0.06 +
        z * 0.04
      );

      // tamaño de cada punto
      let tamano = map(onda, -1, 1, 1, 8);

      strokeWeight(tamano);

      // la onda también mueve los puntos en profundidad
      let movimientoZ = onda * 10;

      point(puntos[i].x, puntos[i].y, z + movimientoZ);
    }
  }

  pop();
}