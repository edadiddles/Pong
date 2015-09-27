var canvas;
var ctx;

var ball = new Ball;
var player = new Paddle;
var computer = new Paddle;


var paddle_height = 200;
var paddle_width = 25;

var lastFrameTimeMs = 0;
var maxFPS = 60;

$(document).ready(function() {
	canvas = document.getElementById('board');
	ctx = canvas.getContext('2d');


    // Ball Initialization
    ball.setPosition(canvas.width/2, canvas.height/2);

	ang_ball = Math.random() * 2*Math.PI;
	ball.setVelocity(1000*Math.cos(ang_ball), 1000*Math.sin(ang_ball)); 

    ball.img.onload = function() {
        ball.draw(ctx);
    }
    ball.setImage("img/ball.png");




    // Player Initialization
    player.setPosition(0, 0);
    
    player.img.onload = function() {
        player.draw(ctx);
    }
    player.setImage("img/paddle.png");    




    // Computer Initialization
    computer.setPosition(canvas.width - 25, canvas.height/2);

	computer.img.onload = function() {
		computer.draw(ctx);
	}
	computer.setImage("img/paddle.png");


	
	requestAnimationFrame(mainLoop);

	$('#board').mousemove(function(event) {
		player.y = event.pageY - paddle_height/2;
	});
});

function buildcanvas() {
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    ball.update();
	
	
	ball.draw(ctx);
    player.draw(ctx);
    computer.draw(ctx);


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

	
	
