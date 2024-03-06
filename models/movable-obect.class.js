class MovableObject extends DrawableObject{

    speedY = 0.15;
    acceleration = 2.5; 
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }

  
    /**
     * Sets up the gravity fot alle movable objects. It uses an parameter for setting the y axis.
     *
     * @memberof MovableObject
     */
    applyGravity()  {
        setInterval(() => {
            if (this.isAboveGround()|| this.speedY > 0 ) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000/40);
    }

    /**
     * Checks if the object is above ground.
     *
     * @return {Boolean}  
     * @memberof MovableObject
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 550;
             
        }
    }

    /**
     * Is used that the movable object can jump.
     *
     * @memberof MovableObject
     */
    jump() {
        this.speedY = 50;
    }
    /**
     * Draws the Image into the canvas.
     *
     * @param {Object} ctx - is the canvas
     * @memberof MovableObject
     */
    draw(ctx) {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height );
    }
    
    /**
     * Let the objct moving right
     *
     * @param {number} speed - amount how fast the object is moving on the x axis.
     * @memberof MovableObject
     */
    moveRight(speed) {
        this.x += speed;
    }

    /**
     * Let the objct moving left
     *
     * @param {number} speed - amount how fast the object is moving on the x axis.
     * @memberof MovableObject
     */
    moveLeft(speed) {
        this.x -= speed;
    }

    /**
     *Checks if the object is colliding with an other object.
     *
     * @param {object} mo - The object for checking collision.
     * @return {boolean} 
     * @memberof MovableObject
     */
    isColliding(mo) {
        return  (this.x + this.width - this.offset.right) >= mo.x + mo.offset.left && 
        (this.x +this.offset.left < mo.x + mo.width - mo.offset.right) &&
        (this.y + this.height - this.offset.bottom) >= mo.y + mo.offset.top &&
        (this.y + this.offset.top < mo.y +mo.height - mo.offset.bottom) 
    }


    /**
     * Uses all the images from the array and draw it. So it looks like the object is animated. The modulo is used, that the images are never even. So this will play for ever. Like an loop.
     *
     * @param {String} images - path of the image.
     * @memberof MovableObject
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++; 
    }

    /**
     * Checks if the character is hitted.
     *
     * @memberof MovableObject
     */
    hit() {
        if (!this.world.character.isAboveGround()) {
            this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }};
    }

    /**
     * Checks the last hit parameter (it is a timestamp), set up a new time if the object is hitted and proofs if the time is smaler 1.
     *
     * @return {boolean} 
     * @memberof MovableObject
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }

    

    /**
     * Checks if the objects energy is 0. 
     *
     * @return {boolean} 
     * @memberof MovableObject
     */
    isDead() {
        return this.energy == 0;
    }
    
}
 
