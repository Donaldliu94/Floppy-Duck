class Countdown {

    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCountdown(score = 0) {
        this.ctx.font = "Bold 50px 'Dokdo', cursive";
        this.ctx.fillStyle = "lightcoral";
        this.ctx.fillText(score, (this.ctx.canvas.width / 2) - 60, this.ctx.canvas.height / 2);

    }


}


export default Countdown;
