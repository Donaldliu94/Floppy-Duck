class Pipe {

    constructor(ctx, topPipe, bottomPipe, shouldMove = false, ducky) {
        this.ctx = ctx;
        this.topPipe = topPipe;         //setting topPipe to a new image object
        this.topPipeHeight = topPipe.height;
        this.topPipeWidth = topPipe.width;
        this.bottomPipe = bottomPipe;
        this.bottomPipeHeight = bottomPipe.height;
        this.bottomPipeWidth = bottomPipe.width;
        this.ducky = ducky;
        this.x = ctx.canvas.width;
        this.y = topPipe.height * (Math.random() / 2 - 0.5);     // 400(-0.5 -> 0) = -200 -> 0
        this.spacing = (Math.random() * 100.0) + topPipe.height + 100;           // RECALCULATE
        //this.spacing = (Math.random() * [additional spacing range]) + [top img height] + [minimum spacing]; 
        this.isMovingUp = Math.random() > 0.5;
        this.isMoving = shouldMove;

    }

    move() {
        this.x--; //= this.x -=.5;               //speed of pipes
        this.ctx.drawImage(this.topPipe, this.x, this.y);
        this.ctx.drawImage(this.bottomPipe, this.x, this.y + this.spacing);
        if(this.isMoving){
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


    isCollision(){

        // if (((this.x < this.ducky.x + this.ducky.scaleWidth) && this.x > this.ducky.x) &&
        //     ((this.y < this.ducky.y + this.ducky.scaleHeight) && (this.y > this.ducky.y))) {
        //     return true;
        // }
        // return false;



        // if ( ((this.ducky.x > this.x) && (this.ducky.x)) && 
        //     ((this.ducky.y > this.y) && (this.ducky.y < this.y + this.spacing)) ) 
        // {
        //     return true;
        // }
        // return false;
        


        if (
            //top points 
            //top left
            (((this.ducky.y > this.y) && (this.ducky.y < this.y + this.topPipeHeight)) &&
            ((this.ducky.x > this.x) && (this.ducky.x < this.x + this.topPipeWidth))) 

            ||

            //top right
            (((this.ducky.y > this.y) && (this.ducky.y < this.y + this.topPipeHeight)) &&
            ((this.ducky.x + this.ducky.scaleWidth > this.x) && (this.ducky.x + this.ducky.scaleWidth < this.x + this.topPipeWidth))) 

            ||
            //bottom points
            
            //bottom left
            (((this.ducky.y + this.ducky.scaleHeight > this.y + this.spacing) && (this.ducky.y + this.ducky.scaleHeight < this.y + this.spacing + this.bottomPipeHeight)) &&
            ((this.ducky.x > this.x) && (this.ducky.x < this.x + this.bottomPipeWidth)))

            ||

            //bottom right
            (((this.ducky.y + this.ducky.scaleHeight > this.y + this.spacing) && (this.ducky.y + this.ducky.scaleHeight < this.y + this.spacing + this.bottomPipeHeight)) &&
            ((this.ducky.x + this.ducky.scaleWidth > this.x) && (this.ducky.x + this.ducky.scaleWidth < this.x + this.bottomPipeWidth)))


        )
        {
            return true;
        }
            return false;
           
        

    }

}





export default Pipe;