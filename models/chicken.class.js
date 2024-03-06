class Chicken extends MovableObject {

    height = 100;
    width = 100;
    y = 840;
    chickenSpeed = 0.55 + (Math.random() * 0.75);
    offset = {
        top: -20,
        bottom: 0,
        left: 10,
        right: 10,
    };


    CHICKEN_WALKING = [
        'img/enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    CHICKEN_DEATH = [
        'img/enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
     * Creates an instance of the Chicken class. Also gives him some attributes and animation. Loading the right Images for the action as well.
     * @memberof Chicken
     */
    constructor() {
        super().loadImage('img/enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1080 + (Math.random() * 3500);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEATH);
        this.animate();  
        this.energy = 20;  
        this.isDead = false;
    }

    /**
     * Gives the chicken the anmiation for walking. Also sets the speed
     *
     * @memberof Chicken
     */
    animate() {
        this.walkingIntervalMove = setInterval(() => {
            this.moveLeft(this.chickenSpeed);
        }, 1000/60);
    
        this.walkingIntervalAnimation = setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 100);
    }
    
    /**
     * Stops the animation. This is used if the chicken is hurting or dying.
     *
     * @memberof Chicken
     */
    stopAnimation() {
        clearInterval(this.walkingIntervalMove);
        clearInterval(this.walkingIntervalAnimation);
    }
    
    /**
     * Handles the behaviour, if the chicken is dead.
     *
     * @memberof Chicken
     */
    death() {
        this.isDead = true;
        world.hurtChickenAudio.pause();
        world.hurtChickenAudio.volume = 0.3;
        world.hurtChickenAudio.play();
        this.stopAnimation();
        this.playAnimation(this.CHICKEN_DEATH);
    }
}

