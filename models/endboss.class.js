class Endboss extends MovableObject {

   height = 800;
   width = 400;
   y = 200;
   x = 1920*3+800;
   energy = 100;
   speed = 90;


    IMAGES_WALKING =[
        'img/enemie_boss_chicken/1_walk/G1.png',
        'img/enemie_boss_chicken/1_walk/G2.png',
        'img/enemie_boss_chicken/1_walk/G3.png',
        'img/enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT_ENDBOSS =[
        'img/enemie_boss_chicken/2_alert/G5.png',
        'img/enemie_boss_chicken/2_alert/G6.png',
        'img/enemie_boss_chicken/2_alert/G7.png',
        'img/enemie_boss_chicken/2_alert/G8.png',
        'img/enemie_boss_chicken/2_alert/G9.png',
        'img/enemie_boss_chicken/2_alert/G10.png',
        'img/enemie_boss_chicken/2_alert/G11.png',
        'img/enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/enemie_boss_chicken/3_attack/G13.png',
        'img/enemie_boss_chicken/3_attack/G14.png',
        'img/enemie_boss_chicken/3_attack/G15.png',
        'img/enemie_boss_chicken/3_attack/G16.png',
        'img/enemie_boss_chicken/3_attack/G17.png',
        'img/enemie_boss_chicken/3_attack/G18.png',
        'img/enemie_boss_chicken/3_attack/G19.png',
        'img/enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/enemie_boss_chicken/4_hurt/G21.png',
        'img/enemie_boss_chicken/4_hurt/G22.png',
        'img/enemie_boss_chicken/4_hurt/G23.png'

    ];

    IMAGES_DEAD = [
        'img/enemie_boss_chicken/5_dead/G24.png',
        'img/enemie_boss_chicken/5_dead/G25.png',
        'img/enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     *  Creates an instance of the endboss class. Also creates the images for the animations.
     */
    constructor () {
        super().loadImage(this.IMAGES_ALERT_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
     }

    /**
     * Gives the endboss the animation for walking and dying. Also set up SFX.
     */
    animate(){
        
            this.attackIntervall = setInterval(() => { 
                this.endbossIsAttacking();
            }, 250);
            this.dyingIntervall = setInterval(() => {
                this.endbossIsDying();
            }, 250)
            this.hurtingIntervall = setInterval(() => {
             this.endbossIsGettingHurted(); 
            }, 250);
    }
    /**
     * This set up the dead aniamtion and the behaviour if the endboss is dead.
     */
    death() {
        clearInterval(this.attackIntervall);
        clearInterval(this.hurtingIntervall);
        this.isDead = true;
        this.y +=150;
        this.x +=150;
        world.endbossAudio.pause();
        world.gameOverAudio.volume = 0.3
        world.gameOverAudio.play();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            world.endGame();
            clearInterval(this.dyingIntervall);
        }, 3000);
    }

    /**
     * Checks if the character is near the endboss.
     * 
     * @returns Boolean 
     */
    characterIsNearEndboss() {
        try {
            return (world.character.x >= 4500);
        } catch {
            console.log('outside range');
        }
    }

    /**
     *  Checks the difference between character x and endboss x so that the endboss can attack.
     * @returns Boolean
     */
    characterIsInAttackRange() {
        let characterX = world.character.x;
        let endbossX = 0;
        if (world.level.enemies.length > 0) {
          endbossX = world.level.enemies[world.level.enemies.length -1].x;
        } else {
            endbossX = world.level.enemies[0];
        } 
        let distance = endbossX-characterX;
        return  (distance < 1000); 
    }

  
    
    /**
     * Checks if the endboss looses energy. It is for the hurt animation.
     * 
     * @returns Boolean
     */
    gettingDamage() {
        return (this.energy < 100);
    }

    /**
     * Checks if the Endboss is attacking.
     *
     * @memberof Endboss
     */
    endbossIsAttacking() {
            if (this.characterIsNearEndboss()) {
                    world.endbossAudio.volume = 0.3;
                    world.endbossAudio.play();
                    this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            } if (this.characterIsInAttackRange()) {
                this.moveLeft(this.speed);
                this.playAnimation(this.IMAGES_ATTACK);
            }  
    }

    /**
     *Checks if the Endboss is dying/death.
     *
     * @memberof Endboss
     */
    endbossIsDying() {
            if (this.energy <= 0) {
                this.death();
            }
    }

    /**
     *Checks if the Endbuss is getting hurted.
     *
     * @memberof Endboss
     */
    endbossIsGettingHurted() {
            if (this.gettingDamage()) {
                world.hurtEndbossAudio.volume = 0.3;
                world.hurtEndbossAudio.play();
                this.playAnimation(this.IMAGES_HURT);
            }
    }
  
}