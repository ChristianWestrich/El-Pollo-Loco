class BackgroundObject extends MovableObject{

    width = 1920;
    height = 1080;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath
     * @param {number} x
     * @memberof BackgroundObject
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 1080 - this.height;

   }
}