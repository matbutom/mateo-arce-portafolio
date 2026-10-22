let miTypo;
let palabra = "autopollesis";

let posicionesX = [];
let posicionesY = [];

let velocidadesX = [];
let velocidadesY = [];

let colorFondo = "#ee9be7";
let margenCanvas = 25;
let margenLinea = 18;

async function setup() {
  createCanvas(420, 420);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  textFont(miTypo);
  textSize(24);
  textAlign(CENTER, CENTER);

  // crear una posición y velocidad para cada letra
  for (let i = 0; i < palabra.length; i++) {
    posicionesX[i] = random(
      margenCanvas,
      width - margenCanvas
    );

    posicionesY[i] = random(
      margenCanvas,
      height - margenCanvas
    );

    velocidadesX[i] = random(2, 2);
    velocidadesY[i] = random(2, 2);

    // elegir direcciones aleatorias
    if (random(1) < 0.5) {
      velocidadesX[i] =
        velocidadesX[i] * -1;
    }

    if (random(1) < 0.5) {
      velocidadesY[i] =
        velocidadesY[i] * -1;
    }
  }
}

function draw() {
  background(colorFondo);

  // mover todas las letras
  for (let i = 0; i < palabra.length; i++) {
    posicionesX[i] =
      posicionesX[i] + velocidadesX[i];

    posicionesY[i] =
      posicionesY[i] + velocidadesY[i];

    // rebotar en los bordes horizontales
    if (
      posicionesX[i] > width - margenCanvas ||
      posicionesX[i] < margenCanvas
    ) {
      velocidadesX[i] =
        velocidadesX[i] * -1;
    }

    // rebotar en los bordes verticales
    if (
      posicionesY[i] > height - margenCanvas ||
      posicionesY[i] < margenCanvas
    ) {
      velocidadesY[i] =
        velocidadesY[i] * -1;
    }
  }

  // dibujar las conexiones en orden
  stroke("#222222");
  strokeWeight(1);

  for (let i = 0; i < palabra.length - 1; i++) {
    let diferenciaX =
      posicionesX[i + 1] - posicionesX[i];

    let diferenciaY =
      posicionesY[i + 1] - posicionesY[i];

    let distancia = dist(
      posicionesX[i],
      posicionesY[i],
      posicionesX[i + 1],
      posicionesY[i + 1]
    );

    if (distancia > margenLinea * 2) {
      let direccionX = diferenciaX / distancia;
      let direccionY = diferenciaY / distancia;

      line(
        posicionesX[i] + direccionX * margenLinea,
        posicionesY[i] + direccionY * margenLinea,
        posicionesX[i + 1] - direccionX * margenLinea,
        posicionesY[i + 1] - direccionY * margenLinea
      );
    }
  }

  // cubrir las líneas alrededor de cada letra
  noStroke();
  fill(colorFondo);

  for (let i = 0; i < palabra.length; i++) {
    circle(
      posicionesX[i],
      posicionesY[i],
      margenLinea * 2
    );
  }

  // dibujar las letras sobre las líneas
  fill("#222222");

  for (let i = 0; i < palabra.length; i++) {
    text(
      palabra[i],
      posicionesX[i],
      posicionesY[i]
    );
  }
}