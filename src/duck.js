class Duck {

    constructor(ctx, duckImg){
        //required
        this.ctx = ctx;
        //customization
        this.gravity = 1;
        this.flapStrength = 30;
        this.duckImg = duckImg;
        this.scale = .80;
        this.frameWidth = duckImg.width / 4;
        this.frameHeight = duckImg.height;
        this.scaleWidth = this.scale * this.frameWidth;
        this.scaleHeight = this.scale * this.frameHeight;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.x = ctx.canvas.width / 4;
        this.y = ctx.canvas.height / 2;
        this.animationSpeed = 5;
        this.rotation = 0;
    }



    drawFrame(){
        this.frameTimer++;
        if(this.frameTimer % this.animationSpeed < 1){
            this.currentFrame = (this.currentFrame + 1) % 4;
        }

        this.ctx.drawImage(this.duckImg, 

            this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
            this.x, this.y, this.scaleWidth, this.scaleHeight);
        

        if (this.y < this.ctx.canvas.height - this.scaleHeight) {
            this.y += this.gravity;
            // rotate down slowly
        }
        
    }

    drawDuck(){

        // const scale = .5;
        // const width = 70;
        // const height = 70;
        // const scaledWidth = scale * width;
        // const scaleHeight = scale * height;

        // drawFrame(frameX, frameY, canvasX, canvasY)
        // this.drawFrame(0, 0, 0, 0);
        // this.drawFrame(1, 0, scaledWidth, 0);
        // this.drawFrame(2, 0, scaledWidth * 2, 0);
        // this.drawFrame(3, 0, scaledWidth * 3, 0);


        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)       //reference
        // this.ctx.drawImage(spriteDuck, 0, 0, width, height, 0, 0, scaledWidth, scaleHeight)
        // this.ctx.drawImage(spriteDuck, width, 0, width, height, scaledWidth, 0, scaledWidth, scaleHeight)
        // this.ctx.drawImage(spriteDuck, width * 2, 0, width, height, scaledWidth * 2, 0, scaledWidth, scaleHeight)
        

        // this.ctx.beginPath();
        // this.ctx.rect(this.x, this.y, this.duckLength, this.duckHeight);
        // this.ctx.fillStyle = "red";
        // this.ctx.fill();
        // this.ctx.closePath();

        // if (this.y < this.ctx.canvas.height - this.duckHeight){
        //     this.y += this.gravity;
        //     //rotate down slowly
        // }
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
        if (this.y > this.ctx.canvas.height - this.scaleHeight) {
            this.y = this.ctx.canvas.height - this.scaleHeight;
            //rotate down sharp
        }
    }

    // changeGravity(newGravity){
    //     this.gravity = newGravity;
    // }


    isCollision() {

        if(this.y + this.scaleHeight >= this.ctx.canvas.height){
            return true;
        }
        else{
            return false;
        }
    }
}




export default Duck;


