var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Duck from './duck';
import Pipe from './pipe';
import Score from './score';
import Missle from './missle';


const topPipe = new Image();         //setting topPipe to a new image object
const bottomPipe = new Image();
const spriteMissle = new Image();
const spriteDuck = new Image();


function start() {            //bottomPipe because bottomPipe is bigger so that means that topPipe will 100% load  //this is my function init
    document.getElementById("play").remove();
    // setInterval(draw, 10);
    ducky = new Duck(ctx, spriteDuck);
    requestAnimationFrame(draw);
};


topPipe.src = "../images/topPipe.png";
bottomPipe.src = "../images/bottomPipe.png";
spriteMissle.src = "../images/missle.png";
spriteDuck.src = "../images/Quacker.png";


const pipeSpacing = 260;

var ducky = new Duck(ctx, spriteDuck);
const scorey = new Score(ctx);


var count = 0;
let score = 0;
var pipes = [];
var missles = [];

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



function draw() {               //step function

    count++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //creating pipes
    if (count > pipeSpacing){
        count = 0;
        pipes.push(new Pipe(ctx, topPipe, bottomPipe, score > 50));
    }

    //Move Pipes/animate pipes
    pipes.forEach(pipe => {
            pipe.move();
            if (pipe.x == 10){                  //score incementation 
                score += 10;
            }
    });
    
    //Remove pipes that have left the screen
    pipes = pipes.filter(pipe => pipe.x > -50);



    //create missles
    if (Math.random() < 0.01){    //roughly 1 missle every 100, 0 -> 0.0099
        missles.push(new Missle(ctx, spriteMissle));
    }
    //move missles
    missles.forEach(missle =>{
        missle.drawFrame();
    });
    
    //remove missles
    missles = missles.filter(missle => missle.x > -70);
    
    
    
    
    


    //unsure
    ducky.drawFrame();

    scorey.drawScore(score);


    requestAnimationFrame(draw)
}




// setInterval( () => {

//     ducky.draw();
// //     map.draw();
// //     score.draw();
// }, 10)



