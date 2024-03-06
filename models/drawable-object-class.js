class DrawableObject{
    x = 150;
    y = 150;
    img;
    imgCache = {};
    currentImage = 0;
    height = 400;
    width = 200;
    
    /**
     * Create a new Image and set up the right image path.
     *
     * @param {string} path - the path of the object that will created like character, coin, cloud and so on.
     * @memberof DrawableObject
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    

    /**
     * Draws the canvas on the screen with the coordinates
     * 
     * @param {Object} ctx - is the created canvas
     * @memberof DrawableObject
     */
    draw(ctx) {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height );
    }

    /**
     * Loads all images of an array (like from the character class). Then creates an image and pushes it into an JSON.
     * 
     * @param {Array} arr - Array with images paths from character, chicken and so on.
     * @memberof DrawableObject
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;      
        });
    }

    /**
     * Draws a Frame around the object. This is for collision debugging.
     * Is disabled for the gaming.
     *
     * @param {Object} ctx - is the created canvas
     * @memberof DrawableObject
     */
    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '1';
    //     ctx.strokeStyle = 'blue';
    //     ctx.rect(this.x,this.y,this.width,this.height );
    //     ctx.stroke();
    //     }
    // }


}