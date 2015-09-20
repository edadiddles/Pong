var canvas;
var ctx;



var player_paddle;
var ball;
var computer_paddle;

var paddle_height = 200;
var paddle_width = 25;

var player_x;
var player_y;

var d_ball;
var pos_ball;

var ang_ball;
var v_ball;

var computer_x;
var computer_y;


var lastFrameTimeMs = 0;
var maxFPS = 60;

$(document).ready(function() {
	canvas = document.getElementById('board');
	ctx = canvas.getContext('2d');

	player_x = 0;
	player_y = 0;

	d_ball = 50;
	pos_ball = [canvas.width/2, canvas.height/2];

	ang_ball = Math.random() * 2*Math.PI;
	v_ball = [1000*Math.cos(ang_ball), 1000*Math.sin(ang_ball)]; 

	computer_x = canvas.width - 25;
	computer_y = canvas.height/2;



	ball = new Image();

	ball.onload = function () {
		ctx.drawImage(ball, pos_ball[0], pos_ball[1]);
	}
	ball.src = 'img/ball.png';


	player_paddle = new Image();

	player_paddle.onload = function() {
		if(player_y > canvas.height - player_paddle.height)
			ctx.drawImage(player_paddle, player_x, canvas.height - paddle_height);
		else if(player_y < 0)
			ctx.drawImage(player_paddle, player_x, 0);
		else
			ctx.drawImage(player_paddle, player_x, player_y);
	}
	player_paddle.src = 'img/paddle.png';



	computer_paddle = new Image();

	computer_paddle.onload = function() {
		if(computer_y > canvas.height - computer_paddle.height)
			ctx.drawImage(computer_paddle, computer_x, canvas.height - paddle_height);
		else if(computer_y < 0)
			ctx.drawImage(computer_paddle, computer_x, 0);
		else
			ctx.drawImage(computer_paddle, computer_x, computer_y);
	}
	computer_paddle.src = "img/paddle.png";


	
	requestAnimationFrame(mainLoop);

	$('#board').mousemove(function(event) {
		player_y = event.pageY - paddle_height/2;
	});
});

function buildcanvas() {
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateBall();
	updateComputer();
	drawPlayerPaddle();
	drawBall();
	drawComputerPaddle();
	ctx.restore();
}

function updateBall() {
	for(i = 0; i < pos_ball.length; i++)
		pos_ball[i] = pos_ball[i] + v_ball[i] * 1/maxFPS;

	// Check for collision with paddle
	if(pos_ball[0] <= paddle_width && ((pos_ball[1] + d_ball/2) >= player_y && (pos_ball[1] + d_ball/2) <= (player_y + paddle_height)))
		 v_ball[0] = -1.05 * v_ball[0];

	if((pos_ball[0] + d_ball) >= (canvas.width - paddle_width) && ((pos_ball[1] + d_ball/2) >= computer_y && (pos_ball[1] + d_ball/2) <= (computer_y + paddle_height)))
		 v_ball[0] = -1.05 * v_ball[0];

	// Check for score
	if(pos_ball[0] < 0 || pos_ball[0] > canvas.width) {
		pos_ball = [canvas.width/2, canvas.height/2];
		ang_ball = Math.random() * 2*Math.PI;
		v_ball = [1000*Math.cos(ang_ball), 1000*Math.sin(ang_ball)];
	} 


	// Check for collision with top boundary
	if(pos_ball[1] < 0 || pos_ball[1] > canvas.height - d_ball) 
		v_ball[1] = -v_ball[1];
}

function updateComputer() {
	if(pos_ball[1]+d_ball/2 < computer_y + paddle_height/2)
		computer_y -= 10;
	else
		computer_y += 10;
}
	

function drawPlayerPaddle() {
	if(player_y > canvas.height - player_paddle.height)
		ctx.drawImage(player_paddle, player_x, canvas.height - paddle_height);
	else if(player_y < 0)
		ctx.drawImage(player_paddle, player_x, 0);
	else
		ctx.drawImage(player_paddle, player_x, player_y);
}

function drawBall() {
	ctx.drawImage(ball, pos_ball[0], pos_ball[1]);
}

function drawComputerPaddle() {
	if(computer_y > canvas.height - computer_paddle.height)
		ctx.drawImage(computer_paddle, computer_x, canvas.height - paddle_height);
	else if(computer_y < 0)
		ctx.drawImage(computer_paddle, computer_x, 0);
	else
		ctx.drawImage(computer_paddle, computer_x, computer_y);
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

	
	
