class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    IMAGES;
    healthBar = new StatusBar("health",100,0,0);
    coinBar = new StatusBar("coin",0,0,80);
    bottleBar = new StatusBar("bottle",0,0,160);
    bossBar = new StatusBar("boss",100,1500,0);
    throwableBottle = []  
    collectedBottles = 0;
    collectedCoins = 0;
    lastAction = new Date().getTime();
    coinAudio = new Audio('audio/collectcoin.wav');
    endbossAudio = new Audio ('audio/boss.mp3');
    gameOverAudio = new Audio ('audio/gameover.mp3');
    hurtEndbossAudio = new Audio('audio/bosscackling.wav');
    hurtChickenAudio = new Audio('audio/chickencackling.wav');
    walking_sound = new Audio('audio/walk.wav');
    jumping_sound = new Audio('audio/jump.wav');
    hurtAudio = new Audio('audio/hurt.mp3');
    throwAudio = new Audio('audio/bottle.wav');
    endbossIsShown = false;
    

    /**
     * Creates an instance of World.
     * @param {obj} canvas
     * @param {obj} keyboard
     * @memberof World
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
    };

    /**
     * Sets the world reference in the character class.
     *
     * @memberof World
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs all the collision checks.
     *
     * @memberof World
     */
    run() {
        setInterval(() => {
                this.createThrowObject();
                this.checkCollisionsCoins();
                this.checkCollisionsBottle();
                this.checkCollisions();
                this.checkCollisionWithEnemy();
                this.endbossShowsUp();
                this.updateStatusBars();
        }, 50);
        
    }

    /**
     * Check collision for the character with an enemy
     *
     * @memberof World
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
              this.character.hit();
                }
            });
    }

    /**
     * Check collision for the character with a coin.
     *
     * @memberof World
     */
    checkCollisionsCoins() {
        let coinIndex = this.level.coins.findIndex((coin) => this.character.isColliding(coin))
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 100){
                this.coinAudio.pause();
                this.coinAudio.play();
                this.collectedCoins += 20;
                this.level.coins.splice(coinIndex,1);
            }
        });        
    }

    /**
     * Update all statusBars.
     *
     * @memberof World
     */
    updateStatusBars(){
        this.coinBar.setPercentage(this.collectedCoins);
        this.healthBar.setPercentage(this.character.energy);
        this.bottleBar.setPercentage(this.collectedBottles) ;
    }

    /**
     * Checks the collission of the character with a bottle.
     *
     * @memberof World
     */
    checkCollisionsBottle() {
        let bottleIndex = this.level.bottles.findIndex((bottle) => this.character.isColliding(bottle))
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 100){
                this.collectedBottles += 20;
                this.level.bottles.splice(bottleIndex,1);
            }
        });        
    }

    /**
     * Creates a bottle for throwing if the character colllides with an bottle on the ground.
     *
     * @memberof World
     */
    createThrowObject() {      
        if (this.keyboard.SPACE && this.currentAction() && this.collectedBottles > 0 ) {
            let bottle = new ThrowableObject(this.character.x +100, this.character.y +100, this.character.otherDirection)
            this.throwableBottle.push(bottle);
            this.collectedBottles -= 20;
        }
    }


    /**
     *Checks if the character hits an anemy through jumping or throwing a bottle.
     *
     * @memberof World
     */
    checkCollisionWithEnemy() {
        this.collisionThroughBottle();
        this.collisionThroughJumping();
    }

    /**
     * Checks if the throwen bottle hits an object or ground.
     *
     * @memberof World
     */
    collisionThroughBottle() {
        this.throwableBottle.forEach((bottle) => {
            if (bottle.y > 850 && bottle.y < 950  ) {
                bottle.splash();
                bottle.stopThrowAnimation();
            } else {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    let enemyIndex = this.level.enemies.findIndex((enemy) => bottle.isColliding(enemy))
                    bottle.splash();
                    bottle.stopThrowAnimation();
                    if(this.level.enemies[this.level.enemies.length -1]) {
                        this.bossBar.setPercentage(this.level.enemies[this.level.enemies.length -1].energy)
                    }
                    this.checkEnemyIsDead(enemy,bottle);                
                }
            })
            }
        })
    }

    /**
     * Checks if the character hits an enemy through jumping.
     *
     * @memberof World
     */
    collisionThroughJumping() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround() && this.character.isColliding(enemy)) {
                let character = this.character;
                this.checkEnemyIsDead(enemy,character);
                character.speedY = 25;
            }
        })
    }


    /**
     *Checks if the enemy is dead.
     *
     * @param {object} enemy - choose the right enemy
     * @param {object} obj - the object which kills the enemy.
     * @memberof World
     */
    checkEnemyIsDead(enemy, obj) {
        if (obj.damage == 0 && !enemy.isDead) {
            obj.damage = 20;
        };
        enemy.energy -= obj.damage ;
        obj.damage = 0;
        if (enemy.energy <= 0) {
            if (!enemy.isDead) {
            enemy.death();
            this.removeEnemyFromArray(enemy) 
            }
        }
    }
    /**
     *Removes the enemy from the level Array
     *
     * @param {object} enemy
     * @memberof World
     */
    removeEnemyFromArray(enemy) {
        setTimeout(() => {
            let enemyIndex = this.level.enemies.indexOf(enemy);
            if (enemyIndex !== -1){ 
                this.level.enemies.splice(enemyIndex,1)
            } ;
        }, 350);  
    }

    /**
     * Proof how much time is passed since the last action.
     *
     * @return {boolean} 
     * @memberof World
     */
    currentAction() {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        this.lastAction = new Date().getTime();
        return timepassed > 0.1;
    }



    /**
     * Draws all objects to the canvas
     *
     * @memberof World
     */
    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableBottle)
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBarsToMap();
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        // draw() calls itself again and again
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    //Since the ForEach function is always repeated, a function is written 
    // (before)
    // this.backgroundObjects .forEach(object => {
    // this.addToMap(object)
    // });
    // Now the function addObjectsToMap(objects)
    // makes the whole thing more readable

    /**
     *  Get an object from the array und use each for drawing in an array. 
     *
     * @param {object} objects
     * @memberof World
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Add a movable object to the game map. 
     *
     * @param {object} mo
     * @memberof World
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx)
        // mo.drawFrame(this.ctx) // Is only for debbuging. Sets a frame around the object.
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    };

    /**
     * Add a statusbar to the game map
     *
     * @memberof World
     */
    addStatusBarsToMap() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.endbossIsShown) {
            this.addToMap(this.bossBar)
        }
    }

    /**
     * Flips an Image, the character for instance. 
     *
     * @param {Object} mo
     * @memberof World
     */
    flipImage(mo) {
        this.ctx.save();
            this.ctx.translate(mo.width,0)
            this.ctx.scale(-1,1)
            mo.x = mo.x *-1;
    }

    /**
     * Flips an Image back, the character for instance. 
     *
     * @param {Object} mo
     * @memberof World
     */
    flipImageBack(mo) {
        mo.x = mo.x *-1;
            this.ctx.restore();
    }

    /**
     * Set up the Page/Canvas on GameOver
     *
     * @memberof World
     */
    endGame() {
        document.getElementById('restartButton').style.display = 'flex';
        document.getElementById('canvas').style.display = 'none'
        document.getElementById('endScreen').style.display = 'block'
        document.getElementById('endScreen').style.backgroundImage = "url('img/intro_outro_screens/game_over/gameover!.png')"     
    }

    /**
     * Set up the Page/Canvas on Player lost the Game.
     *
     * @memberof World
     */
    endGameLost() {
        document.getElementById('restartButton').style.display = 'flex';
        document.getElementById('canvas').style.display = 'none'
        document.getElementById('endScreen').style.display = 'block'
        document.getElementById('endScreen').style.backgroundImage = "url('img/intro_outro_screens/game_over/oh no you lost!.png')"
    }
    
    /**
     * Checks if the Endboss is showing.
     *
     * @memberof World
     */
    endbossShowsUp() {
        if (this.character.x > 5000) {
            this.endbossIsShown = true;
        }
    }
}
