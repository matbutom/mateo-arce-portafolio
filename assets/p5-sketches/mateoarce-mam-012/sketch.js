// sketch con modelo 3d de mí mismo
// puedes verlo en mateoarce.cl :)

let miTypo;
let modelo;
let escena3D;
let capaAscii;

let rotacionX = 20;
let rotacionY = 0;

let paso = 8;
let caracteres = "@#%8&*+=-:.z+";

let fondoR = 238;
let fondoG = 155;
let fondoB = 231;

async function setup() {
  createCanvas(420, 420, WEBGL);
  pixelDensity(10);

  // cargar la tipografía
  miTypo = await loadFont(
    "assets/IBMPlexMono-Regular.ttf"
  );

  // crear el framebuffer para el modelo invisible
  escena3D = createFramebuffer({
    width: width,
    height: height,
    density: 1
  });

  // crear la capa ascii
  capaAscii = createGraphics(
    width,
    height
  );

  capaAscii.pixelDensity(10);
  capaAscii.textFont(miTypo);
  capaAscii.textSize(paso * 0.9);
  capaAscii.textAlign(CENTER, CENTER);

  // cargar el modelo
  modelo = await loadModel(
    "assets/model_mesh.stl",
    {
      fileType: ".stl",
      normalize: true
    }
  );
}

function draw() {
  // dibujar el modelo en el framebuffer invisible
  escena3D.begin();

  background(
    fondoR,
    fondoG,
    fondoB
  );

  push();

  rotacionY = rotacionY + 0.01;

  rotateY(rotacionY);
  rotateX(rotacionX);

  scale(2);

  noStroke();
  normalMaterial();

  model(modelo);

  pop();

  escena3D.end();

  // obtener los píxeles del modelo
  let captura = escena3D.get();

  captura.loadPixels();

  // dibujar solamente el fondo en el canvas final
  background(
    fondoR,
    fondoG,
    fondoB
  );

  capaAscii.clear();
  capaAscii.noStroke();

  // recorrer la imagen como una cuadrícula
  for (
    let y = 0;
    y < height;
    y = y + paso
  ) {
    for (
      let x = 0;
      x < width;
      x = x + paso
    ) {
      let muestraX =
        min(
          floor(x + paso / 2),
          width - 1
        );

      let muestraY =
        min(
          floor(y + paso / 2),
          height - 1
        );

      let indice =
        4 * (
          muestraX +
          muestraY * width
        );

      let r =
        captura.pixels[indice];

      let g =
        captura.pixels[indice + 1];

      let b =
        captura.pixels[indice + 2];

      // comprobar si la celda pertenece al modelo
      let diferencia =
        abs(r - fondoR) +
        abs(g - fondoG) +
        abs(b - fondoB);

      if (diferencia > 45) {
        let brillo =
          (r + g + b) / 3;

        // crear una variación estable para cada celda
        let patron =
          (x * 13 + y * 7) % 100;

        // dibujar bloques negros en zonas oscuras
        if (
          brillo < 95 ||
          patron < 20
        ) {
          capaAscii.fill("#121212");

          capaAscii.square(
            x,
            y,
            paso
          );
        }

        // dibujar algunos cuadrados de color
        else if (patron < 28) {
          capaAscii.fill(r, g, b);

          capaAscii.square(
            x + 2,
            y + 2,
            paso - 3
          );
        }

        // dibujar algunos círculos
        else if (patron < 42) {
          capaAscii.fill("#111111");

          capaAscii.circle(
            x + paso / 2,
            y + paso / 2,
            paso * 0.65
          );
        }

        // dibujar caracteres ascii
        else {
          let indiceCaracter = floor(
            map(
              brillo,
              0,
              255,
              0,
              caracteres.length - 1
            )
          );

          indiceCaracter = constrain(
            indiceCaracter,
            0,
            caracteres.length - 1
          );

          capaAscii.fill("#111111");

          capaAscii.text(
            caracteres[indiceCaracter],
            x + paso / 2,
            y + paso / 2
          );
        }
      }
    }
  }

  // dibujar solamente la reconstrucción ascii
  image(
    capaAscii,
    -width / 2,
    -height / 2,
    width,
    height
  );
}

function mouseDragged() {
  // controlar la rotación con el mouse
  rotacionY =
    rotacionY + movedX * 0.01;

  rotacionX =
    rotacionX + movedY * 0.01;

  return false;
}