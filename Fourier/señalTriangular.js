let tiempo = 0;
let onda = [];

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    translate(200, 200);

    let x = 0;
    let y = 0;

    for (let ina = 0; ina < 100; ina++) {

        let x_init = x;
        let y_init = y;

        let n = ina * 2 + 1;
        let radio = 75 * ((8 / (n * n * PI * PI)));
        
        x += radio * sin(n * tiempo);
        y += radio * cos(n * tiempo);

        stroke(255, 100);
        noFill();
        ellipse(x_init, y_init, radio * 2);

        stroke(255);
        line(x_init, y_init, x, y);
    }

    onda.unshift(y);

    translate(200, 0);
    line(x - 200, y, 0, onda[0]);
    beginShape();
    noFill();
    for (let ina = 0; ina < onda.length; ina++) {
        vertex(ina, onda[ina]);
    }
    endShape();

    tiempo += 0.05;

    if (onda.length > 250) {
        onda.pop();
    }
}

