var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Duck from './duck';
import Pipe from './pipe';
import Score from './score';
import Missle from './missle';
import bigMissle from './bigMissle';


const topPipe = new Image();         //setting topPipe to a new image object
const bottomPipe = new Image();
const spriteMissle = new Image();
const spriteDuck = new Image();
const spritebigMissle = new Image();

const soundy = new Audio();


function start() {            //bottomPipe because bottomPipe is bigger so that means that topPipe will 100% load  //this is my function init
    document.getElementById("play").remove();
    // setInterval(draw, 10);
    ducky = new Duck(ctx, spriteDuck);
    requestAnimationFrame(draw);
};


topPipe.src = "./images/topPipe.png";
bottomPipe.src = "./images/bottomPipe.png";
spriteMissle.src = "./images/missle.png";
spriteDuck.src = "./images/Quacker.png";
spritebigMissle.src = "./images/bigMissle.png";

soundy.src = "./sound/score.mp3";

const pipeSpacing = 195;

var ducky = new Duck(ctx, spriteDuck);
const scorey = new Score(ctx);


var count = 0;
let score = 0;
var pipes = [];
var missles = [];
var bigMissles = [];
var isGameover = false;


document.getElementById("play").addEventListener("click", start);
document.addEventListener("keyup", keyPress);
canvas.addEventListener("click", upHandler);
canvas.addEventListener("click", reloadHandler);




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
    score += 10
}

function downHandler() {
    ducky.duckDown();
}

function reloadHandler(e){
    if (isGameover && e.type == "click") {
        location.reload();
    }
}



if (isGameover) {
    document.getElementById("game_over");
}


// SCREEN RENDER 



function draw() {               //step function

    count++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //creating pipes
    if (count > pipeSpacing){
        count = 0;
        pipes.push(new Pipe(ctx, topPipe, bottomPipe, score > 10, ducky));
    }

    //Move Pipes/animate pipes
    pipes.forEach(pipe => {
            pipe.move();

            isGameover = isGameover || pipe.isCollision();

        if (pipe.x == (ctx.canvas.width / 4) - topPipe.width - 10 ){                  //score incementation 
                score += 1;
                soundy.play();
            }
    });
    
    //Remove pipes that have left the screen
    pipes = pipes.filter(pipe => pipe.x > -50);



    if (score > 15){
        //create missles
        if (Math.random() < 0.005){    //roughly 1 missle every 100, 0 -> 0.0099
            missles.push(new Missle(ctx, spriteMissle, ducky));
        }
        //move missles
        missles.forEach(missle =>{
            missle.drawFrame();

            isGameover = isGameover || missle.isCollision();
        });
        
        //remove missles
        missles = missles.filter(missle => missle.x > -70);
    }


    if ( score > 20)  {
        //create bigMissles
        if (Math.random() < 0.003) { 
            bigMissles.push(new bigMissle(ctx, spritebigMissle, ducky));
        }
        // //move bigMissles
        bigMissles.forEach(bigMissle => {
            bigMissle.drawFrame();

            isGameover = isGameover || bigMissle.isCollision();
        });

        // //remove bigMissles
        bigMissles = bigMissles.filter(bigMissle => bigMissle.x > -70);
    }

    
    

    ducky.drawFrame();
    scorey.drawScore(score);


    //collision for floor
    isGameover = isGameover || ducky.isCollision();
    


    if(!isGameover){
        requestAnimationFrame(draw)
    } else {

    }
}




        





