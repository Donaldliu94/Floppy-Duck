class Score {

    constructor(ctx){
        this.ctx = ctx;
    }

    drawScore(score= 0) {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: " + score, 8, 20);
    }


}


export default Score;
