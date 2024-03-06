class ThrowableObject extends MovableObject{


    IMAGES_THROW = [
        'img/salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/salsa_bottle/bottle_rotation/3_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];   

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - x coordinate
     * @param {number} y - x coordinate
     * @param {boolean} isOtherDirection
     * @memberof ThrowableObject
     */
    constructor(x, y, isOtherDirection) {
        super().loadImage(this.IMAGES_THROW[0]);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
        this.x = x;
        this.y = y;
        this.direction = isOtherDirection;
        this.height = 100;
        this.width = 100;
        this.damage = 20;  
   
    }
    /**
     * Throws an object, in this case a bottle in the right direction.
     *
     * @memberof ThrowableObject
     */
    throw() {     
        this.speedY = 20; 
        this.applyGravity();
        this.speedX = 15;
        this.throwInterval = setInterval(() => {
            if (this.direction) {
                this.throwRight();
            } else {
                this.throwLeft();
            }
        }, 20);
    }

    /**
     * Stops the intervall of the throwing.
     *
     * @memberof ThrowableObject
     */
    stopThrowAnimation() {
        clearInterval(this.throwInterval);
    } 

    /**
     * Sets a animation for splashing/smashing the bottle on an enemy 
     *
     * @memberof ThrowableObject
     */
    splash() {
        world.throwAudio.volume = 0.4;
        world.throwAudio.play();
        this.playAnimation(this.IMAGES_SPLASH);
    }

    isOnGround() {
        console.log(this.y)
        return this.y = 550
    }

    /**
     * Throws the bottle to the left side
     *
     * @memberof ThrowableObject
     */
    throwLeft() { 
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_THROW);
    }

    /**
     * Throws the bottle to the right side
     *
     * @memberof ThrowableObject
     */
    throwRight() {
            this.x -= this.speedX;
            this.playAnimation(this.IMAGES_THROW);
    }


}
