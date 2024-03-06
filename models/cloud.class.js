class Cloud extends MovableObject {

    y = 20;
    width = 1000;
    height = 800;
    cloudSpeed = 0.35;

    /**
     * Creates an instance of Cloud class.
     * @param {string} path - the path for the the right cloud image. 
     * @param {number} x - the x position for the cloud
     * @memberof Cloud
     */
    constructor(path,x) {
        super().loadImage(path,x);
        this.x = x;
        this.animate();
    }

    /**
     * Animate the cloud moving on the sky.
     * @memberof Cloud
     */
    animate() {
        setInterval( () => {
            this.moveLeft(this.cloudSpeed);
        }, 1000/60);
    }
}