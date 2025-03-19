let x = [];
let y = [];
let fourierX;
let fourierY;
let tiempo = 0;
let path = [];
let figura = 1;

function setup() {
  createCanvas(800, 600);

  document.getElementById('Triangulo').addEventListener('click', function() {
    cambiarFigura(1);
  });

  document.getElementById('Cuadrado').addEventListener('click', function() {
    cambiarFigura(2);
  });

  document.getElementById('Estrella').addEventListener('click', function() {
    cambiarFigura(3);
  });

  inicializarFigura();
}

function inicializarFigura() {
  switch (figura) {
    case 1:
      cargarFigura(triangulo);
      break;
    case 2:
      cargarFigura(cuadrado);
      break;
    case 3:
      cargarFigura(flower);
    default:
      console.log("no pos que hiciste");
  }
}

function cambiarFigura(nuevaFigura) {
  figura = nuevaFigura;
  reiniciarDatos();
  inicializarFigura();
}

function cargarFigura(arreglo) {
  const skip = 1;
  for (let i = 0; i < arreglo.length; i += skip) {
    x.push(arreglo[i].x);
    y.push(arreglo[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
}

function reiniciarDatos() {
  x = [];
  y = [];
  path = [];
  tiempo = 0;
}


function epiciclo(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let x_init = x;
    let y_init = y;
    let freq = fourier[i].freq;
    let radio = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radio * cos(freq * tiempo + phase + rotation);
    y += radio * sin(freq * tiempo + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(x_init, y_init, radio * 2);
    stroke(255);
    line(x_init, y_init, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  let vx = epiciclo(width / 2 + 100, 100, 0, fourierX);
  let vy = epiciclo(100, height / 2 + 100, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y);
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  tiempo += dt;

  if (tiempo > TWO_PI) {
    tiempo = 0;
    path = [];
  }
}

