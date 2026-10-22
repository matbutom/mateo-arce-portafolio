let miTypo;
let palabra = "autopollesis";

let trayectoria = [];
let distanciasAcumuladas = [];
let longitudTotal = 0;

let recorrido = 0;
let velocidad = 2;
let separacion = 50;
let dibujando = false;

let entradaTexto;
let botonReset;

let colorFondo = "#ee9be7";
let margenLetra = 17;

async function setup() {
  createCanvas(420, 420);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  textFont(miTypo);
  textSize(24);
  textAlign(CENTER, CENTER);

  // crear el input de texto
  entradaTexto = createInput(palabra);
  entradaTexto.position(10, height + 12);
  entradaTexto.size(270, 26);
  entradaTexto.input(actualizarPalabra);

  // crear el botón de reset
  botonReset = createButton("reset");
  botonReset.position(295, height + 12);
  botonReset.size(90, 30);
  botonReset.mousePressed(reiniciar);
}

function draw() {
  background(colorFondo);

  // dibujar la trayectoria
  noFill();
  stroke("#222222");
  strokeWeight(2);

  beginShape();

  for (let i = 0; i < trayectoria.length; i++) {
    vertex(
      trayectoria[i].x,
      trayectoria[i].y
    );
  }

  endShape();

  // mover las letras cuando la trayectoria está terminada
  if (
    dibujando == false &&
    longitudTotal > 0
  ) {
    recorrido = recorrido + velocidad;

    for (let i = 0; i < palabra.length; i++) {
      let distanciaLetra =
        recorrido + i * separacion;

      distanciaLetra =
        distanciaLetra % longitudTotal;

      let posicion =
        obtenerPosicion(distanciaLetra);

      // cubrir la línea detrás de cada letra
      noStroke();
      fill(colorFondo);

      circle(
        posicion.x,
        posicion.y,
        margenLetra * 2
      );

      // dibujar el carácter
      fill("#222222");

      text(
        palabra[i],
        posicion.x,
        posicion.y
      );
    }
  }
}

function mousePressed() {
  // comenzar solamente dentro del canvas
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    trayectoria = [];
    distanciasAcumuladas = [];
    longitudTotal = 0;
    recorrido = 0;

    trayectoria.push(
      createVector(mouseX, mouseY)
    );

    dibujando = true;
  }
}

function mouseDragged() {
  if (
    dibujando &&
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    let ultimo =
      trayectoria[trayectoria.length - 1];

    let distancia = dist(
      mouseX,
      mouseY,
      ultimo.x,
      ultimo.y
    );

    // guardar puntos con un poco de separación
    if (distancia > 4) {
      trayectoria.push(
        createVector(mouseX, mouseY)
      );
    }
  }

  return false;
}

function mouseReleased() {
  if (dibujando) {
    dibujando = false;
    calcularLongitud();
    recorrido = 0;
  }
}

function calcularLongitud() {
  longitudTotal = 0;
  distanciasAcumuladas = [0];

  for (let i = 1; i < trayectoria.length; i++) {
    let distancia = dist(
      trayectoria[i - 1].x,
      trayectoria[i - 1].y,
      trayectoria[i].x,
      trayectoria[i].y
    );

    longitudTotal =
      longitudTotal + distancia;

    distanciasAcumuladas.push(
      longitudTotal
    );
  }
}

function obtenerPosicion(distanciaBuscada) {
  for (
    let i = 1;
    i < distanciasAcumuladas.length;
    i++
  ) {
    if (
      distanciaBuscada <=
      distanciasAcumuladas[i]
    ) {
      let inicio =
        distanciasAcumuladas[i - 1];

      let largoSegmento =
        distanciasAcumuladas[i] - inicio;

      let porcentaje =
        (distanciaBuscada - inicio) /
        largoSegmento;

      let x = lerp(
        trayectoria[i - 1].x,
        trayectoria[i].x,
        porcentaje
      );

      let y = lerp(
        trayectoria[i - 1].y,
        trayectoria[i].y,
        porcentaje
      );

      return createVector(x, y);
    }
  }

  return trayectoria[
    trayectoria.length - 1
  ];
}

function actualizarPalabra() {
  palabra = entradaTexto.value();
  recorrido = 0;
}

function reiniciar() {
  trayectoria = [];
  distanciasAcumuladas = [];
  longitudTotal = 0;
  recorrido = 0;
  dibujando = false;
}