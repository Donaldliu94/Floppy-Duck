class bigMissle {

    constructor(ctx, bigMissleImg, ducky) {
        this.ctx = ctx;
        this.bigMissleImg = bigMissleImg;
        this.ducky = ducky;
        this.frameWidth = bigMissleImg.width / 4;
        this.frameHeight = bigMissleImg.height;
        this.x = ctx.canvas.width;
        this.y = (ctx.canvas.height) * Math.random() - 35;
        this.currentFrame = 0;
        this.frameTimer = 0;
        //customization
        this.scale = 1;
        this.bigMissleSpeed = 5;
        this.animationSpeed = 10;       //frametimer, every time 10 frames i change the image
    }




    drawFrame() {
        this.frameTimer++;
        if (this.frameTimer % this.animationSpeed < 1) {
            this.currentFrame = (this.currentFrame + 1) % 4;
        }
        this.x -= this.bigMissleSpeed;


        //homing
        if (this.y < this.ducky.y){
            this.y += 0.3;
        }

        if (this.y > this.ducky.y){
            this.y -= 0.3;
        }

        this.ctx.drawImage(this.bigMissleImg,
            this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
            this.x, this.y, this.scale * this.frameWidth, this.scale * this.frameHeight);
    }



    isCollision() {

        if (((this.x < this.ducky.x + this.ducky.scaleWidth) && this.x > this.ducky.x) &&
            ((this.y < this.ducky.y + this.ducky.scaleHeight) && (this.y > this.ducky.y))) {
            return true;
        }
        return false;
    }

}


export default bigMissle;