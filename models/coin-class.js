class Coin extends MovableObject{
    
    IMAGE = [
        'img/coin/coin_1.png',
        'img/coin/coin_2.png'
    ];
    offset = {
        top: 10,
        bottom: 40,
        left: 20,
        right: 20,
    };


   /**
    * Creates an instance of the coin class. Also sets up animation.
    * @memberof Coin
    */
    constructor() {
        super().loadImage(this.IMAGE[0]);
        this.loadImages(this.IMAGE);
        this.x = 1080 + (Math.random() * 4500);
        this.y = this.getRandomYPosition();
        this.width = 150;
        this.height = 150;
        this.animate();

    }

    /**
    * Creates a random position for the y axis
    * 
    * @returns - a random value for the y position.
    * @memberof Coin
    */
   getRandomYPosition() {
        let minY = 0;
        let maxY = 300;
        return (maxY - minY) + (Math.random() * 500);
    }

    /**
     * Animate the coin based on the images.
     *
     * @memberof Coin
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE);
        }, 300);
    }




   
}