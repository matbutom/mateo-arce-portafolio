let miTypo;
let palabra = "autopollesis";

let caracteres = [];
let tamanos = [];
let tamanosObjetivo = [];

let espacio = 8;

async function setup() {
  createCanvas(420, 420);

  miTypo = await loadFont("assets/IBMPlexMono-Regular.ttf");
  textFont(miTypo);
  textAlign(LEFT, CENTER);

  for (let i = 0; i < palabra.length; i++) {
    caracteres.push(palabra[i]);
    tamanos.push(50);
    tamanosObjetivo.push(50);
  }
}

function draw() {
  background("#ee9be7");

  // cada 90 fotogramas elegir tamaños nuevos
  
  if (frameCount % 60 === 0) {
    for (let i = 0; i < caracteres.length; i++) {
      tamanosObjetivo[i] = random(20, 80);
    }
  }

  // acercar lentamente cada letra a su nuevo tamaño
  
  for (let i = 0; i < caracteres.length; i++) {
    tamanos[i] = lerp(
      tamanos[i],
      tamanosObjetivo[i],
      0.03
    );
  }

  let anchos = [];
  let anchoTotal = 0;

  // calcular el ancho total
  
  for (let i = 0; i < caracteres.length; i++) {
    textSize(tamanos[i]);

    anchos[i] = textWidth(caracteres[i]);
    anchoTotal = anchoTotal + anchos[i] + espacio;
  }

  anchoTotal = anchoTotal - espacio;

  // comenzar desde el centro
  
  let x = width / 2 - anchoTotal / 2;

  // dibujar cada letra
  
  for (let i = 0; i < caracteres.length; i++) {
    textSize(tamanos[i]);
    text(caracteres[i], x, height / 2);

    x = x + anchos[i] + espacio;
  }
}