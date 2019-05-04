var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Duck from './duck';
import Pipe from './pipe';
import Score from './score';
import Missle from './missle';
import bigMissle from './bigMissle';
import Countdown from './countdown';


const topPipe = new Image();         //setting topPipe to a new image object
const bottomPipe = new Image();
const spriteMissle = new Image();
const spriteDuck = new Image();
const spritebigMissle = new Image();

const soundy = new Audio();


// var database;



function start() {            //bottomPipe because bottomPipe is bigger so that means that topPipe will 100% load  //this is my function init
    document.getElementById("play").remove();
    // setInterval(draw, 10);

    let i = 0;
    setInterval( () => {
        if (i < countdown.length){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            countdowny.drawCountdown(countdown[i]);
        }
        i++;  //why does this not work if i moved it into the setInterval?
        // debugger
        // if (countdown > 0){
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     countdowny.drawCountdown(countdown);
        // }
        // countdown--;
    }, 1000);


    setTimeout( () => {
        ducky = new Duck(ctx, spriteDuck);
        requestAnimationFrame(draw);            //set this in a callback as a settimeout to do 321 countdown
    }, 4000);

}


topPipe.src = "./images/topPipe.png";
bottomPipe.src = "./images/bottomPipe.png";
spriteMissle.src = "./images/missle.png";
spriteDuck.src = "./images/Quacker.png";
spritebigMissle.src = "./images/bigMissle.png";

soundy.src = "./sound/score.mp3";

const pipeSpacing = 195;

var ducky = new Duck(ctx, spriteDuck);
const scorey = new Score(ctx);
const countdowny = new Countdown(ctx);

var count = 0;
let score = 0;
var countdown = ["READY?","set","CLICK!!!"];
var pipes = [];
var missles = [];
var bigMissles = [];
var isGameover = false;


document.getElementById("play").addEventListener("click", start);
document.getElementById("gameOver").addEventListener("click", restart);
document.addEventListener("keyup", keyPress);
canvas.addEventListener("click", upHandler);
canvas.addEventListener("click", reloadHandler);

canvas.addEventListener("selectstart", function (e) {           //prevents highlighting on click
    e.preventDefault();
    return false;
}, false);


var form = document.getElementById("scoreForm");


// var config = {
//     apiKey: "AIzaSyAueh9kpLxdf0pdc265IlXWNWfY16MVumQ",
//     authDomain: "floppy-duck.firebaseapp.com",
//     databaseURL: "https://floppy-duck.firebaseio.com",
//     projectId: "floppy-duck",
//     storageBucket: "floppy-duck.appspot.com",
//     messagingSenderId: "17684805408"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

// var ref = database.ref('scores');
// ref.on('value', gotData, errData);

var hiscores = [];


// function gotData(data){
//     var scores = data.val();
//     var keys = Object.keys(scores);

//     document.getElementById('submits').innerHTML = keys.length;
//     const scoreList = [];
//     for (let idx = 0; idx < keys.length; idx++){
//         const key = keys[idx];
//         scoreList.push(scores[key]);
//     }
    
//     const leaderBoardLength = Math.min(scoreList.length, 10);
//     const highScores = scoreList.slice(0, leaderBoardLength);
//     const ul = document.getElementById("leaderboard-list");
    
//     for (let idx = 0; idx < highScores.length; idx++) {
        
//     }

// }





// function errData(err) {

// }




function keyPress(e) {
    if (e.key == "ArrowUp") {
        upHandler();
    }
    else if (e.key == "ArrowDown") {
        downHandler();
    }
    else if (e.key == " "){
        upHandler();
    }
}

function upHandler() {
    ducky.duckUp();
}

function downHandler() {
    ducky.duckDown();
}

function reloadHandler(e){
    if (isGameover && e.type == "click") {
        location.reload();
    }
}

function restart(){
    location.reload();
}


function submitScore(e, score) {
    e.preventDefault();
    // debugger
    if (e.target[0].value.length > 0 && e.target[0].value.length < 20){
        var data = {
            name: e.target[0].value,
            score: score
        };
        
        var ref = database.ref();
        ref.push(data);
        document.getElementById("scoreForm").remove();
        // document.getElementById("gameOver").style.zIndex = 6;
        document.getElementById("gameOver").style.display = "inline";
    }


}



// if (isGameover) {
//     document.getElementById("gameOver").style.zIndex = 6;
// }


// SCREEN RENDER 



function draw() {               //step function

    count++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //creating pipes
    if (count > pipeSpacing){
        count = 0;
        pipes.push(new Pipe(ctx, topPipe, bottomPipe, score > 20, ducky));
    }

    //Move Pipes/animate pipes
    pipes.forEach(pipe => {
            pipe.move();
            isGameover = isGameover || pipe.isCollision();

        if (pipe.x == (ctx.canvas.width / 4) - topPipe.width - 10 ){                  //score incementation 
                score += 5;
                soundy.play();
            }
    });
    
    //Remove pipes that have left the screen

    pipes = pipes.filter(pipe => pipe.x > -50);



    if (score > 10){
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


    if ( score > 15)  {
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
        requestAnimationFrame(draw);
    } else {
        document.getElementById("scoreForm").style.display = "inline";
        form.addEventListener('submit', (e) => submitScore(e, score));

    }
}




        





