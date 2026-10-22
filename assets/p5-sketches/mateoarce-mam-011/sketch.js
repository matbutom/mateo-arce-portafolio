let miTypo;
let mascara;
let capa;

let alfabeto = "abcdefghijklmnopqrstuvwxyz";
let indiceAnterior = -1;

let sliderLetra;
let sliderMinimo;
let sliderMaximo;
let sliderVelocidad;
let sliderDireccion;
let sliderFrecuencia;

let separacion = 9;

let desplazamientoX = 0;
let desplazamientoY = 0;

let colorFondo = "#ee9be7";
let colorCirculos = "#222222";

async function setup() {
  createCanvas(420, 420);
  pixelDensity(10);

  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  // crear la máscara de la letra
  mascara = createGraphics(width, height);
  mascara.pixelDensity(1);

  // crear la capa de círculos
  capa = createGraphics(width, height);
  capa.pixelDensity(10);

  // crear los controles
  sliderLetra = crearControl(
    "letra",
    0,
    alfabeto.length - 1,
    0,
    1,
    height + 10
  );

  sliderMinimo = crearControl(
    "mínimo",
    1,
    15,
    2,
    1,
    height + 40
  );

  sliderMaximo = crearControl(
    "máximo",
    5,
    40,
    22,
    1,
    height + 70
  );

  sliderVelocidad = crearControl(
    "velocidad",
    0,
    0.2,
    0.05,
    0.005,
    height + 100
  );

  sliderDireccion = crearControl(
    "dirección",
    0,
    360,
    45,
    1,
    height + 130
  );

  sliderFrecuencia = crearControl(
    "frecuencia",
    0.005,
    0.15,
    0.0,
    0.005,
    height + 160
  );

  generarMascara(alfabeto[0]);
  indiceAnterior = 0;
}

function draw() {
  background(colorFondo);

  let indiceActual =
    Number(sliderLetra.value());

  // cambiar la letra seleccionada
  if (indiceActual != indiceAnterior) {
    generarMascara(
      alfabeto[indiceActual]
    );

    indiceAnterior = indiceActual;
  }

  let diametroMinimo =
    Number(sliderMinimo.value());

  let diametroMaximo =
    Number(sliderMaximo.value());

  // mantener el tamaño mínimo debajo del máximo
  let minimo = min(
    diametroMinimo,
    diametroMaximo
  );

  let maximo = max(
    diametroMinimo,
    diametroMaximo
  );

  let velocidad =
    Number(sliderVelocidad.value());

  let frecuencia =
    Number(sliderFrecuencia.value());

  let direccion = radians(
    Number(sliderDireccion.value())
  );

  // obtener la dirección horizontal y vertical
  let direccionX = cos(direccion);
  let direccionY = sin(direccion);

  // limpiar la capa transparente
  capa.clear();
  capa.noStroke();
  capa.fill(colorCirculos);

  // activar la intersección positiva y negativa
  capa.drawingContext.globalCompositeOperation =
    "xor";

  for (
    let y = 0;
    y < height;
    y = y + separacion
  ) {
    for (
      let x = 0;
      x < width;
      x = x + separacion
    ) {
      let indicePixel =
        4 * (x + y * width);

      let opacidad =
        mascara.pixels[indicePixel + 3];

      if (opacidad > 100) {
        let posicionX =
          x + desplazamientoX;

        let posicionY =
          y + desplazamientoY;

        // proyectar la posición sobre la dirección
        let posicionOnda =
          posicionX * direccionX +
          posicionY * direccionY;

        // crear la onda en movimiento
        let fase =
          posicionOnda * frecuencia -
          frameCount * velocidad;

        let onda =
          (sin(fase) + 1) / 2;

        // concentrar el crecimiento de los círculos
        onda = pow(onda, 3);

        let diametro = lerp(
          minimo,
          maximo,
          onda
        );

        capa.circle(
          posicionX,
          posicionY,
          diametro
        );
      }
    }
  }

  // recuperar el modo normal de dibujo
  capa.drawingContext.globalCompositeOperation =
    "source-over";

  image(capa, 0, 0);
}

function crearControl(
  nombre,
  minimo,
  maximo,
  valor,
  paso,
  y
) {
  let etiqueta = createSpan(nombre);

  etiqueta.position(10, y + 2);
  etiqueta.style("font-family", "monospace");
  etiqueta.style("font-size", "12px");

  let control = createSlider(
    minimo,
    maximo,
    valor,
    paso
  );

  control.position(100, y);
  control.size(width - 110);

  return control;
}

function generarMascara(letra) {
  mascara.clear();

  mascara.textFont(miTypo);
  mascara.textSize(480);
  mascara.textAlign(CENTER, CENTER);

  mascara.noStroke();
  mascara.fill(255);

  mascara.text(
    letra,
    width / 2,
    height / 2
  );

  mascara.loadPixels();

  let minimoX = width;
  let maximoX = 0;
  let minimoY = height;
  let maximoY = 0;

  // buscar los bordes visibles
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let indicePixel =
        4 * (x + y * width);

      let opacidad =
        mascara.pixels[indicePixel + 3];

      if (opacidad > 20) {
        minimoX = min(minimoX, x);
        maximoX = max(maximoX, x);
        minimoY = min(minimoY, y);
        maximoY = max(maximoY, y);
      }
    }
  }

  // calcular el centro visible
  let centroLetraX =
    (minimoX + maximoX) / 2;

  let centroLetraY =
    (minimoY + maximoY) / 2;

  desplazamientoX =
    width / 2 - centroLetraX;

  desplazamientoY =
    height / 2 - centroLetraY;
}