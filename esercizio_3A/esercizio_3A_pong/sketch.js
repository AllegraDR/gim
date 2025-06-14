let posX = 200;
let posY = 100;
let velX = 3;
let velY = 4;

// Paddle settings
let paddleH = 60;
let paddleW = 10;
let paddleLeftY, paddleRightY;

// Colore della pallina
let ballColorR = 100;
let ballColorG = 150;
let ballColorB = 200;

function setup() {
	createCanvas(400, 400);
	paddleLeftY = height / 2 - paddleH / 2;
	paddleRightY = height / 2 - paddleH / 2;
}

function draw() {
	// Sfondo semi-trasparente per creare la scia
	background(0, 20);

	// Cambia colore ogni frame (gradualmente)
	ballColorR = (ballColorR + 1) % 256;
	ballColorG = (ballColorG + 2) % 256;
	ballColorB = (ballColorB + 3) % 256;

	// Disegna la palla con il colore aggiornato
	fill(ballColorR, ballColorG, ballColorB);
	noStroke();
	ellipse(posX, posY, 20, 20);

	// Muove la palla
	posX += velX;
	posY += velY;

	// Rimbalzo su bordi alto/basso
	if (posY <= 0 || posY >= height) {
		velY *= -1;
	}

	// Paddle sinistro
	fill(255);
	rect(10, paddleLeftY, paddleW, paddleH);

	// Paddle destro
	rect(width - paddleW - 10, paddleRightY, paddleW, paddleH);

	// Controlli paddle sinistro (W / S)
	if (keyIsDown(87)) paddleLeftY -= 5; // W
	if (keyIsDown(83)) paddleLeftY += 5; // S

	// Controlli paddle destro (↑ / ↓)
	if (keyIsDown(UP_ARROW)) paddleRightY -= 5;
	if (keyIsDown(DOWN_ARROW)) paddleRightY += 5;

	// Limiti paddle
	paddleLeftY = constrain(paddleLeftY, 0, height - paddleH);
	paddleRightY = constrain(paddleRightY, 0, height - paddleH);

	// Collisione con paddle sinistro
	if (posX - 10 <= 10 + paddleW && posY > paddleLeftY && posY < paddleLeftY + paddleH) {
		velX *= -1;
		posX = 10 + paddleW + 10;
	}

	// Collisione con paddle destro
	if (posX + 10 >= width - paddleW - 10 && posY > paddleRightY && posY < paddleRightY + paddleH) {
		velX *= -1;
		posX = width - paddleW - 20;
	}

	// Rimbalzo ai bordi laterali → resetta palla al centro
	if (posX < 0 || posX > width) {
		posX = width / 2;
		posY = height / 2;
		velX *= -1;
	}
}