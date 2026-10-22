// La autopoiesis es la capacidad de un sistema vivo para producirse, mantenerse y regenerarse a sí mismo de manera continua
// el "pollesis" es por el chiste :)

let miTypo;
let textos = [];

async function setup() {
  createCanvas(420, 420);

  // https://p5js.org/reference/p5/loadfont/
  // await significa espera a que esto termine antes de seguir
  // nunca lo había usado lol, es de la v2

  miTypo = await loadFont("assets/IBMPlexMono-Regular.ttf");

  textFont(miTypo);
  textSize(25);

  // .push sirve para agregar un nuevo elemento al final de la lista del array
  // evita tener que escribir todos los índices manualmente

  for (let i = 0; i < 40; i++) {
    textos.push({
      x: random(width),
      y: random(height),

 // velocidad de movimiento
      vx: random(-2, 0.5),
      vy: random(-2, 0.5),
    });
  }
}

function draw() {
  background("#ee9be720");
  fill(20);

  for (let i = 0; i < textos.length; i++) {
    let t = textos[i];

    text("autopollesis", t.x, t.y);

    t.x = t.x + t.vx;
    t.y = t.y + t.vy;

    if (t.x < 0 || t.x > width) {
      t.vx = t.vx * -1;
    }

    if (t.y < 20 || t.y > height) {
      t.vy = t.vy * -1;
    }
  }
}
