class Score {

    constructor(ctx){
        this.ctx = ctx;
    }

    drawScore(score= 0) {
        this.ctx.font = "Bold 50px Arial";
        this.ctx.fillStyle = "lightcoral";
        this.ctx.fillText(score, (this.ctx.canvas.width / 2) - 20, this.ctx.canvas.height / 5 );
        
    }


}


export default Score;
