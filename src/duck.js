var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var paddleHeight = 50;
var paddleWidth = 50;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight) / 2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var gravity = 0.5;
var speedX = 0.5;
var speedY = 0.5;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("click", mouseMoveHandler, false);



function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == "ArrowUp"){
        upPressed = true;
    }
    else if (e.key == "ArrowDown"){
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "ArrowDown"){
        downPressed = false;
    }
}


function drawDuck() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}




function draw() {
    
    paddleY += gravity;
    paddleX += speedX;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDuck();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
    }
    else if (leftPressed && paddleX > 50) {
        paddleX -= 10;
    }
    else if (upPressed && paddleY > 0){
        paddleY -= 10;
        paddleY += 7;
    }
    else if (downPressed && paddleX > 0) {
        paddleY += 10;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);