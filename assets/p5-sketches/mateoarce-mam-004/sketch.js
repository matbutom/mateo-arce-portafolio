let miTypo;
let palabra = "autopollesis";

let caracteres = [];
let tamanos = [];

let tamanoNormal = 24;
let tamanoGrande = 52;
let espacio = 8;

async function setup() {
  createCanvas(420, 420);

  miTypo = await loadFont("assets/IBMPlexMono-Regular.ttf");
  textFont(miTypo);
  textAlign(LEFT, CENTER);

  // recorrer cada letra para llenar el array de caracteres y tamaños
  
  // caracteres = ["a", "u", "t", "o", "p", "o", "l", "l", "e", "s", "i", "s"];
  // tamanos = [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  for (let i = 0; i < palabra.length; i++) {
    caracteres.push(palabra[i]);
    tamanos.push(tamanoNormal);
  }
}

function draw() {
  background("#ee9be7");

  let anchos = [];
  let anchoTotal = 0;

  // calcular el ancho de cada letra
  
  for (let i = 0; i < caracteres.length; i++) {
    textSize(tamanos[i]);

    anchos[i] = textWidth(caracteres[i]);
    anchoTotal = anchoTotal + anchos[i] + espacio;
  }

  // quitar el espacio sobrante de la última letra
  
  anchoTotal = anchoTotal - espacio;

  let x = width / 2 - anchoTotal / 2;

  // comprobar si el mouse está encima
  
  for (let i = 0; i < caracteres.length; i++) {
    let estaEncima =
      mouseX >= x &&
      mouseX <= x + anchos[i] &&
      mouseY >= height / 2 - tamanos[i] / 2 &&
      mouseY <= height / 2 + tamanos[i] / 2;

    if (estaEncima) {
      tamanos[i] = lerp(tamanos[i], tamanoGrande, 0.15);
    } else {
      tamanos[i] = lerp(tamanos[i], tamanoNormal, 0.15);
    }

    x = x + anchos[i] + espacio;
  }

  // recalcular el ancho después de cambiar los tamaños
  
  anchoTotal = 0;

  for (let i = 0; i < caracteres.length; i++) {
    textSize(tamanos[i]);

    anchos[i] = textWidth(caracteres[i]);
    anchoTotal = anchoTotal + anchos[i] + espacio;
  }

  anchoTotal = anchoTotal - espacio;
  x = width / 2 - anchoTotal / 2;

  // dibujar las letras
  for (let i = 0; i < caracteres.length; i++) {
    textSize(tamanos[i]);
    text(caracteres[i], x, height / 2);

    x = x + anchos[i] + espacio;
  }
}