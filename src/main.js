var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Duck from './duck';
import Pipe from './pipe';
import Score from './score'


const topPipe = new Image();         //setting topPipe to a new image object
const bottomPipe = new Image();

function start() {            //bottomPipe because bottomPipe is bigger so that means that topPipe will 100% load
    document.getElementById("play").remove();
    setInterval(draw, 10);
};


topPipe.src = "../images/topPipe.png";
bottomPipe.src = "../images/bottomPipe.png";

const pipeSpacing = 195;
const ducky = new Duck(ctx);

const scorey = new Score(ctx);

var count = 0;
let score = 0;
var pipes = [];
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// const score = new Score(ctx);

document.getElementById("play").addEventListener("click", start);
document.addEventListener("keyup", keyPress);
canvas.addEventListener("click", upHandler);

function keyPress(e) {
    if (e.key == "ArrowUp") {
        upHandler();
    }
    else if (e.key == "ArrowDown") {
        downHandler();
    }
}

function upHandler() {
    ducky.duckUp();
    score--;
}

function downHandler() {
    ducky.duckDown();
}



// SCREEN RENDER 

function draw() {

    count++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (count > pipeSpacing){
        count = 0;
        pipes.push(new Pipe(ctx, topPipe, bottomPipe));
    }
    //Move Pipes
    pipes.forEach(pipe => {
        if(score > 100) { 
            pipe.move(true);
            if (pipe.x == 10){ 
                score += 10;
            }
        } 

        else {
            pipe.move();
            if (pipe.x == 10){                  //score incementation 
                score += 10;
            }
        }

    });
    //Remove pipes that have left the screen
    pipes = pipes.filter(pipe => pipe.x > -50);
    
    


    ducky.drawDuck();

    scorey.drawScore(score);
}



// setInterval( () => {

//     ducky.draw();
// //     map.draw();
// //     score.draw();
// }, 10)



