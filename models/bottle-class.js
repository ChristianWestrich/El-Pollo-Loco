class Bottle extends DrawableObject {

    IMAGES = [
        'img/salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    randomImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 20,
    };

    
    /**
    * Creates a new instance of a bottle on the ground that could be picked up by the character.
    * @memberof Bottle
    */
    constructor() {
        super();
        this.chooseImage();
        this.loadImage(this.IMAGES[this.randomImage]);
        this.x = 1080 + (Math.random() * 3500);
        this.y = 840;
        this.width = 100;
        this.height = 100;
   }

   /**
   * Choose a random image (left/right) for the bottle.
   */
    chooseImage() {
        this.randomImage = Math.floor(Math.random() * 2) ;
    }
}   