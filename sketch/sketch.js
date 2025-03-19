let time = 0;
let path = [];
let currentFigure = 'triangle';

function setup() {
  createCanvas(800, 600);
  drawFigure(currentFigure);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Dibuja la serie de Fourier para la figura actual
  let points = drawFigure(currentFigure);

  // Añade los puntos al path
  path.unshift(points);

  // Dibuja el path
  noFill();
  stroke(0);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    for (let j = 0; j < path[i].length; j++) {
      vertex(path[i][j].x, path[i][j].y);
    }
  }
  endShape();

  // Incrementa el tiempo para avanzar en la serie de Fourier
  time += 0.02;

  // Limita el tamaño del path para evitar ralentizar la aplicación
  if (path.length > 500) {
    path.pop();
  }
}

function changeFigure(figure) {
  currentFigure = figure;
  path = [];
  time = 0;
}

function drawFigure(figure) {
  let points = [];
  let x = 0;
  let y = 0;

  switch (figure) {
    case 'triangle':
      for (let i = 0; i < 3; i++) {
        let n = i * 2 + 1;
        let term = 200 * (4 / (n * PI)) * sin(n * time);
        x += term * cos(i * TWO_PI / 3);
        y += term * sin(i * TWO_PI / 3);
        points.push(createVector(x, y));
      }
      break;

    case 'square':
      for (let i = 0; i < 4; i++) {
        let n = i * 2 + 1;
        let term = 200 * (4 / (n * PI)) * sin(n * time);
        x += term * (i % 2 === 0 ? 1 : -1);
        y += term * (i % 2 === 1 ? 1 : -1);
        points.push(createVector(x, y));
      }
      break;

    case 'circle':
      let n = 1;
      let term = 200 * (4 / (n * PI)) * sin(n * time);
      x = term * cos(time);
      y = term * sin(time);
      points.push(createVector(x, y));
      break;

    default:
      break;
  }

  // Dibuja la figura
  stroke(0);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();

  return points;
}
