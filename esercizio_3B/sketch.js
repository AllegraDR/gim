let prevH, prevM, prevS;
let colorH, colorM, colorS;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	background(0);

	prevH = hour();
	prevM = minute();
	prevS = second();

	colorH = color(random(255), random(255), random(255));
	colorM = color(random(255), random(255), random(255));
	colorS = color(random(255), random(255), random(255));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {
	background(0, 30);

	let h = hour();
	let m = minute();
	let s = second();

	let centerX = width / 2;
	let centerY = height / 2;

	let radiusH = 200;  // Raggio per l'ora (più esterno)
	let radiusM = 150;  // Raggio per i minuti (medio)
	let radiusS = 100;  // Raggio per i secondi (interno)

	// Cambio colore a ogni variazione
	if (h !== prevH) {
		colorH = color(random(255), random(255), random(255));
		prevH = h;
	}
	if (m !== prevM) {
		colorM = color(random(255), random(255), random(255));
		prevM = m;
	}
	if (s !== prevS) {
		colorS = color(random(255), random(255), random(255));
		prevS = s;
	}

	// Convertiamo in formato 12 ore
	let displayH = h % 12;
	if (displayH === 0) {
		displayH = 12;  // In formato 12 ore, 0 diventa 12
	}

	// Posizioni angolari per ore, minuti, secondi
	let angleH = map(displayH, 1, 12, -90, 270); // Ore (1 - 12)
	let angleM = map(m, 0, 60, -90, 270); // Minuti (0 - 60)
	let angleS = map(s, 0, 60, -90, 270); // Secondi (0 - 60)

	// Coordinate orbitali
	let squareX = centerX + cos(angleH) * radiusH;
	let squareY = centerY + sin(angleH) * radiusH;

	let triangleX = centerX + cos(angleM) * radiusM;
	let triangleY = centerY + sin(angleM) * radiusM;

	let circleX = centerX + cos(angleS) * radiusS;
	let circleY = centerY + sin(angleS) * radiusS;

	// Disegna numeri del quadrante (12, 3, 6, 9)
	fill(255);
	noStroke();
	textSize(24);
	textAlign(CENTER, CENTER);
	let quadrantRadius = 250;
	let labels = ["12", "3", "6", "9"];
	for (let i = 0; i < 4; i++) {
		let angle = map(i, 0, 4, -90, 270); // -90: 12 in alto
		let x = centerX + cos(angle) * quadrantRadius;
		let y = centerY + sin(angle) * quadrantRadius;
		text(labels[i], x, y);
	}

	// Glow effect
	function drawGlow(x, y, drawFn, col) {
		for (let i = 10; i >= 1; i--) {
			let alpha = map(i, 1, 10, 10, 100);
			fill(red(col), green(col), blue(col), alpha);
			noStroke();
			push();
			translate(x, y);
			scale(1 + i * 0.05);
			drawFn();
			pop();
		}
	}

	// Disegna forme con effetto glow
	drawGlow(squareX, squareY, () => {
		rectMode(CENTER);
		rect(0, 0, 50, 50); // Quadrato per le ore
	}, colorH);

	drawGlow(triangleX, triangleY, () => {
		triangle(-20, 20, 0, -20, 20, 20); // Triangolo (dimensione originale) per i minuti
	}, colorM);

	drawGlow(circleX, circleY, () => {
		ellipse(0, 0, 50, 50); // Cerchio per i secondi
	}, colorS);

	// Testi dentro le forme
	fill(255);
	noStroke();

	// Dimensione del numero delle ore
	textSize(14);
	textAlign(CENTER, CENTER);

	// Posiziona correttamente il numero delle ore
	let displayHour = h % 24;
	if (displayHour === 0) displayHour = 12; // Se è mezzanotte, metti 12
	if (displayHour > 12) displayHour -= 12; // Se è PM (12-23), trasformalo in formato 12 ore

	// Posiziona il numero dell'ora sulla traiettoria
	let hourAngle = map(displayHour, 1, 12, -90, 270);
	let hourX = centerX + cos(hourAngle) * radiusH;
	let hourY = centerY + sin(hourAngle) * radiusH;

	// Testo delle ore
	text(nf(displayHour, 2), hourX, hourY);

	// Testo dei minuti (normale)
	textSize(14);
	text(nf(m, 2), triangleX, triangleY); // Minuti nel triangolo

	// Numero dei secondi più piccolo
	textSize(10); // Ridotto per i secondi
	text(nf(s, 2), circleX, circleY); // Secondi nel cerchio
}