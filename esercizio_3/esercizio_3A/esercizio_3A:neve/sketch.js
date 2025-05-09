let fiocchi;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100); // usa HSB per colori più vivaci
	fiocchi = [];

	for (let i = 0; i < 500; i++) {
		fiocchi[i] = {
			px: random(0, width),
			py: random(-100),
			dim: random(20, 40),
			vel: random(1, 10),
			hue: random(360) // tono iniziale
		};
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(100);

	textAlign(CENTER, CENTER);

	for (let i = 0; i < fiocchi.length; i++) {
		let f = fiocchi[i];

		f.hue = (f.hue + 1) % 360; // cambia colore ogni frame
		fill(f.hue, 80, 100); // colore HSB

		f.px += random(-1.5, 1.5);
		f.py += f.vel;

		if (f.py > height) {
			f.py = 0;
		}

		textSize(f.dim);
		text("*", f.px, f.py);
	}
}
