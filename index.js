let canvas = document.createElement("canvas");
	canvas.width = 800;
	canvas.height = 600;

let ctx, size = 10, 
	px = canvas.width * 0.5, py = canvas.height * 0.5, 
	pxv = 0, pyv = 0,
	speed = 0.5;

let ex = 100, ey = 100;

	
let keys = [];

function update() {
	keys.forEach( key => {
		switch(key) {
			case "j":
			case "s":
			case "arrowdown":
				pyv++;
				break;
			case "l":
			case "d":
			case "arrowright":
				pxv++;
				break;
			case "h":
			case "a":
			case "arrowleft":
				pxv--;
				break;
			case "k":
			case "w":
			case "arrowup":
				pyv--;
				break;
		}
	});

	px += pxv * speed;
	py += pyv * speed;

	if( px > canvas.width - size) { px = canvas.width - size; }
	if(px < 0) { px = 0; }

	if( py > canvas.height - size) { py = canvas.height - size; }
	if(py < 0) { py = 0; }

	pxv *= 0.90;
	pyv *= 0.90;

	if( AABB(px, py, size, size, ex, ey, 10, 10) ) {
		size += 2;
		ex = getRandomInt(10, canvas.width - 10);
		ey = getRandomInt(10, canvas.height - 10);
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#dd0033";
	ctx.fillRect(px, py, size, size);

	ctx.fillStyle = "#00dd33";
	ctx.fillRect(ex, ey, 10, 10);
}

function loop() {
	update();
	draw();
	requestAnimationFrame( loop );
}

document.addEventListener("DOMContentLoaded", dcl => {
	document.body.appendChild( canvas );
	ctx = canvas.getContext("2d");
	requestAnimationFrame( loop );
});

document.addEventListener("keydown", event => {
	if( keys.indexOf( event.key.toLowerCase() ) == -1 ) {
		keys.push( event.key.toLowerCase() );
	}
});

document.addEventListener("keyup", event => {
	let index = keys.indexOf( event.key.toLowerCase() );
	if( index != -1 ) {
		keys.splice( index, 1 );
	}
});

// Detects collision between 2 rectangles...
function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
	return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (y1 + h1 > y2);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
