class StatusBar extends DrawableObject{

    
    percentage;

    IMAGES_HEALTH = [
        'img/statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_COINS = [
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    
    IMAGES_BOTTLES = [
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    IMAGES_ENDBOSS = [
        'img/statusbars/2_statusbar_endboss/green/green0.png',
        'img/statusbars/2_statusbar_endboss/green/green20.png',
        'img/statusbars/2_statusbar_endboss/green/green40.png',
        'img/statusbars/2_statusbar_endboss/green/green60.png',
        'img/statusbars/2_statusbar_endboss/green/green80.png',
        'img/statusbars/2_statusbar_endboss/green/green100.png',
    ]
    

    /**
     * Create a instace of status bar for the character like health.
     * 
     * @param {String} images - images of the array above. 
     * @param {number} percentage - a number that is for proofing for the right index of the images.
     * @param {number} x - set up the x coordinate
     * @param {number} y - set up the y coordinate
     * @memberof StatusBar
     */
    constructor(images,percentage,x,y) {
        super();
        this.chooseRightPicturesPaths(images);
        this.setPercentage(percentage);
        this.x = x;
        this.y = y;
        this.width = 400;
        this.height = 100;

    }

    /**
     * Use the percentage number and choose the right picture from the array above.
     * 
     * @param {number} percentage - a number that is for proofing for the right index of the images.
     * @memberof StatusBar
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
    }

    
    /**
    * Set up the images for the wright status bar like health. 
    * 
    * @param {string} images - picks up the right images from the array above.
    * @memberof StatusBar
    */
    chooseRightPicturesPaths(images) {
        if ("health" === images) {
            this.IMAGES = this.IMAGES_HEALTH;
        } else if ("coin" === images) {
            this.IMAGES = this.IMAGES_COINS;
        } else if ("bottle" === images) {
            this.IMAGES = this.IMAGES_BOTTLES;
        } else if ("boss" === images) {
            this.IMAGES = this.IMAGES_ENDBOSS;
        }  

        this.loadImages(this.IMAGES);
    }

    /**
     * Resolve the right Index to choose the right image from array. It uses the percentage.
     *
     * @return {number} - Returns the index number for the images of the array.
     * @memberof StatusBar
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

