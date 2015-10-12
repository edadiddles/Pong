var canvas;
var ctx;

var ball = new Ball;
var player = new Player;
var computer = new Computer;

var lastFrameTimeMs = 0;
var maxFPS = 120;

$(document).ready(function() {
	canvas = document.getElementById('board');
	ctx = canvas.getContext('2d');


    // Ball Initialization
    ball.reset();
    ball.setImage("img/ball.png");


    // Player Initialization
    player.setPosition(0, 0);
    player.setImage("img/paddle.png");    




    // Computer Initialization
    computer.setPosition(canvas.width - 25, canvas.height/2);
	computer.setImage("img/paddle.png");


	
	requestAnimationFrame(mainLoop);
});

function buildcanvas() {
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    ball.update();
    computer.update();	
	
	ball.draw(ctx);
    player.draw(ctx);
    computer.draw(ctx);


	ctx.restore();
}

function mainLoop(timestamp) {
	if(timestamp < lastFrameTimeMs + (1000/maxFPS)) {
		requestAnimationFrame(mainLoop);
		return;
	}
	
	lastFrameTimeMs = timestamp;
	buildcanvas();
	requestAnimationFrame(mainLoop);
}

	
	
