function setup() {
	createCanvas(windowWidth, windowHeight)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	background(0, 0, 0)

	for(let i=0; i<100; i=i+1) {
	let gl = random (10, 150)
	let gX = random (0, width)
	let gY = random (-gl, height)
	

	strokeWeight (random (1,3))
	stroke (255,200)
	line (gX, gY, gX, gY + gl)
	}


}

