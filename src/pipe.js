class Pipe {

    constructor(ctx, topPipe, bottomPipe) {
        this.ctx = ctx;
        this.topPipe = topPipe;         //setting topPipe to a new image object
        this.bottomPipe = bottomPipe;
        this.x = ctx.canvas.width;
        this.y = topPipe.height * (Math.random() / 2 - 0.5);     // 400(-0.5 -> 0) = -200 -> 0
        this.spacing = (Math.random() * 100.0) + topPipe.height + 80;           // RECALCULATE
        //this.spacing = (Math.random() * [additional spacing range]) + [top img height] + [minimum spacing]; 
        this.isMovingUp = true;
    }

    move(shouldMove = false) {
        this.x--; //= this.x -=.5;               //speed of pipes
        this.ctx.drawImage(this.topPipe, this.x, this.y);
        this.ctx.drawImage(this.bottomPipe, this.x, this.y + this.spacing);
        if(shouldMove){
            if (this.isMovingUp){
                if (this.y > this.ctx.canvas.height / -2){
                    this.y--;
                }
                else{
                    this.isMovingUp = false;
                }
            }
            else{
                if (this.y < 0) {
                    this.y++;
                }
                else {
                    this.isMovingUp = true;
                }
            }
        }
    }
}





export default Pipe;