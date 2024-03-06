class BabyChicken extends Chicken {

    height = 80;
    width = 80;
    y = 860;

    CHICKEN_WALKING = [
        'img/enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    CHICKEN_DEATH = [
        'img/enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
    * Creates an instance of BabyChicken
    * Initializes the properties, including image loading.
    * @memberof BabyChicken
    */
    constructor() {
        super();
        this.x = 1080 + (Math.random() * 3500);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEATH);
        this.energy = 20;  
        this.isDead = false;
    }

}
