class Countdown {

    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCountdown(score = 0) {
        this.ctx.font = "Bold 75px Arial";
        this.ctx.fillStyle = "goldenrod";
        this.ctx.fillText(score, (this.ctx.canvas.width / 2) - 20, this.ctx.canvas.height / 2);

    }


}


export default Countdown;
