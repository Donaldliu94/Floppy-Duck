class Duck {

    constructor(ctx){
        //required
        this.ctx = ctx;

        //customization
        this.gravity = 1;
        this.flapStrength = 40;
        this.duckHeight = 20;
        this.duckLength = 20;
        this.x = ctx.canvas.width / 5;
        this.y = ctx.canvas.height / 2;
        this.rotation = 0;
    }

    drawDuck() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.duckLength, this.duckHeight);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();

        if (this.y < this.ctx.canvas.height - this.duckHeight){
            this.y += this.gravity;
            //rotate down slowly
        }
    }

    duckUp(){
        this.y -= this.flapStrength;
        if (this.y < 0){
            this.y = 0;
            //rotate up sharp
        }
    }

    duckDown() {
        this.y += this.flapStrength / 2;
        if (this.y > this.ctx.canvas.height - this.duckHeight) {
            this.y = this.ctx.canvas.height - this.duckHeight;
            //rotate down sharp
        }
    }

    changeGravity(newGravity){
        this.gravity = newGravity;
    }
}




export default Duck;


