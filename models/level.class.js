class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 1920*4;

    /**
     * Creates a instance of level class. It has some objects of other classes in it.
     * 
     * @param {Object} enemies - instances of the according to its class
     * @param {Object} clouds  - instances of the according to its class
     * @param {Object} bottles  - instances of the according to its class
     * @param {Object} coins  - instances of the according to its class
     * @param {Object} backgroundObjects  - instances of the according to its class
     * @memberof Level
     */
    constructor(enemies,clouds,bottles,coins,backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}

