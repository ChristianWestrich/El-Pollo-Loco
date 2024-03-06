class Character extends MovableObject {
    
    IMAGES_IDLE = [
        'img/character_pepe/1_idle/idle/I-1.png',
        'img/character_pepe/1_idle/idle/I-2.png',
        'img/character_pepe/1_idle/idle/I-3.png',
        'img/character_pepe/1_idle/idle/I-4.png',
        'img/character_pepe/1_idle/idle/I-5.png',
        'img/character_pepe/1_idle/idle/I-6.png',
        'img/character_pepe/1_idle/idle/I-7.png',
        'img/character_pepe/1_idle/idle/I-8.png',
        'img/character_pepe/1_idle/idle/I-9.png',
        'img/character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_WALKING = [
        'img/character_pepe/2_walk/W-21.png',
        'img/character_pepe/2_walk/W-22.png',
        'img/character_pepe/2_walk/W-23.png',
        'img/character_pepe/2_walk/W-24.png',
        'img/character_pepe/2_walk/W-25.png',
        'img/character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMP = [
        
        "img/character_pepe/3_jump/J-32.png",
        "img/character_pepe/3_jump/J-33.png",
        "img/character_pepe/3_jump/J-34.png",
        "img/character_pepe/3_jump/J-35.png",
        "img/character_pepe/3_jump/J-36.png",
        "img/character_pepe/3_jump/J-37.png",
        "img/character_pepe/3_jump/J-38.png",
        "img/character_pepe/3_jump/J-39.png",

    ];

    IMAGES_DEAD = [
        "img/character_pepe/5_dead/D-51.png",
        "img/character_pepe/5_dead/D-52.png",
        "img/character_pepe/5_dead/D-53.png",
        "img/character_pepe/5_dead/D-54.png",
        "img/character_pepe/5_dead/D-55.png",
        "img/character_pepe/5_dead/D-56.png",
        "img/character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/character_pepe/4_hurt/H-41.png",
        "img/character_pepe/4_hurt/H-42.png",
        "img/character_pepe/4_hurt/H-43.png"
    ];

    IMAGES_LONG_IDLE = [
        'img/character_pepe/1_idle/long_idle/I-11.png',
        'img/character_pepe/1_idle/long_idle/I-12.png',
        'img/character_pepe/1_idle/long_idle/I-13.png',
        'img/character_pepe/1_idle/long_idle/I-14.png',
        'img/character_pepe/1_idle/long_idle/I-15.png',
        'img/character_pepe/1_idle/long_idle/I-16.png',
        'img/character_pepe/1_idle/long_idle/I-17.png',
        'img/character_pepe/1_idle/long_idle/I-18.png',
        'img/character_pepe/1_idle/long_idle/I-19.png',
        'img/character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;  
    charSpeed = 15;
    currentTime = new Date().getTime();
    bottleAmount = 0;
    coinAmount = 0;
    damage = 20;
    y = 550;
    energy = 100;
    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 30,
    };

    
    /**
    * Creates a new instance of the character. Also gives him some properties like animation and also load the images for the walking and so on.
    * @memberof Character
    */
    constructor() {
        super().loadImage('img/character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    /*
    * Checks the time has passed since the last character action. 
    * Returns a boolean that proofs, if the character goes into long IDLE.
    */
    timeCheck() {
        let timepassed = new Date().getTime() - this.currentTime;
        timepassed = timepassed / 1000;
        return timepassed > 4 ? true : false;
    }

    /**
     * Animates the character for the keyboard input. Also checks if the character is dead, hurt, above ground.
     * @memberof Character
     */
    animate() {
        this.characterIsMoving();
        this.checkingInterval = setInterval(() => {
            if (this.isDead()) {
                this.characterDied();
            } else if (this.isHurt()){
                this.characterIsHurted();             
            } else if (this.isAboveGround()) {
                this.loadImage("img/character_pepe/3_jump/J-31.png")
                this.playAnimation(this.IMAGES_JUMP);                  
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_WALKING);
            } else if (this.timeCheck()){
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }    
        }, 160) ;
    }

    /**
     *Checks if the player uses key/button inputs that lets the character moving.
     *
     * @memberof Character
     */
    characterIsMoving() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.energy == 0) {
                this.movingRight();
            }
            if (this.world.keyboard.LEFT && this.x > -1300 && !this.energy == 0) {
                this.movingLeft();
            }
            if (this.world.keyboard.UP && !this.isAboveGround() && !this.energy == 0 && !this.isHurt()){
                this.jumping();
            }
            this.world.camera_x = -this.x +200;
        },1000/60);
    }
    
    /**
     * Behaviour of the character if it is moving right.
     *
     * @memberof Character
     */
    movingRight() {
        this.moveRight(this.charSpeed);
        this.otherDirection = false;
        world.walking_sound.volume = 0.4;
        world.walking_sound.play();
        this.currentTime = new Date().getTime();
    }

    /**
     * Behaviour of the character if it is moving left.
     *
     * @memberof Character
     */
    movingLeft() {
        this.moveLeft(this.charSpeed);
        this.otherDirection = true;
        world.walking_sound.volume = 0.4;
        world.walking_sound.play();
        this.currentTime = new Date().getTime();
    }

    /**
     * Behaviour of the character if it is jumping.
     *
     * @memberof Character
     */
    jumping() {
        this.jump();
        world.jumping_sound.play();
        this.currentTime = new Date().getTime();
    }

    /**
     * Behaviour of the character if it is dying/dead.
     *
     * @memberof Character
     */
    characterDied() {
        this.y += 20;
        setTimeout(() => {
            world.endGameLost();
            clearInterval(this.checkingInterval);
        }, 3000);
            world.hurtEndbossAudio.pause();
            world.endbossAudio.pause();
            world.gameOverAudio.volume = 0.3;
            world.gameOverAudio.play();
            this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Behaviour of the character if it is getting hurted.
     *
     * @memberof Character
     */
    characterIsHurted() {
        world.hurtAudio.volume = 0.3;
        world.hurtAudio.play();
        this.playAnimation(this.IMAGES_HURT) ;     
    }
    
}