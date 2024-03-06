let level1;

/**
 * Initialize the level of the level class. Inserts some enemys and collectibles like bottle and coins. Also sets up clouds and the background images.
 *
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new BabyChicken(),
      new Chicken(),
      new Chicken(),
      new BabyChicken(),
      new Chicken(),
      new BabyChicken(),
      new Chicken(),
      new BabyChicken(),
      new Endboss(),
    ],
    [
      new Cloud("img/background/layers/4_clouds/1.png", -1919),
      new Cloud("img/background/layers/4_clouds/2.png", 0),
      new Cloud("img/background/layers/4_clouds/1.png", 1919),
      new Cloud("img/background/layers/4_clouds/2.png", 1919 * 2),
      new Cloud("img/background/layers/4_clouds/1.png", 1919 * 3),
      new Cloud("img/background/layers/4_clouds/2.png", 1919 * 4),
    ],
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],

    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],

    [
      new BackgroundObject("img/background/layers/air.png", -1919, 500),
      new BackgroundObject("img/background/layers/3_third_layer/2.png", -1919),
      new BackgroundObject("img/background/layers/2_second_layer/2.png", -1919),
      new BackgroundObject("img/background/layers/1_first_layer/2.png", -1919),
      new BackgroundObject("img/background/layers/air.png", 0, 500),
      new BackgroundObject("img/background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/background/layers/air.png", 1919, 500),
      new BackgroundObject("img/background/layers/3_third_layer/2.png", 1919),
      new BackgroundObject("img/background/layers/2_second_layer/2.png", 1919),
      new BackgroundObject("img/background/layers/1_first_layer/2.png", 1919),
      new BackgroundObject("img/background/layers/air.png", 1919 * 2, 500),
      new BackgroundObject("img/background/layers/3_third_layer/1.png",1919 * 2),
      new BackgroundObject("img/background/layers/2_second_layer/1.png",1919 * 2),
      new BackgroundObject("img/background/layers/1_first_layer/1.png",1919 * 2),
      new BackgroundObject("img/background/layers/air.png", 1919 * 3, 500),
      new BackgroundObject("img/background/layers/3_third_layer/2.png", 1919 * 3),
      new BackgroundObject("img/background/layers/2_second_layer/2.png",1919 * 3),
      new BackgroundObject("img/background/layers/1_first_layer/2.png", 1919 * 3),
      new BackgroundObject("img/background/layers/air.png", 1919 * 4, 500),
      new BackgroundObject("img/background/layers/3_third_layer/1.png", 1919 * 4),
      new BackgroundObject("img/background/layers/2_second_layer/1.png",1919 * 4),
      new BackgroundObject("img/background/layers/1_first_layer/1.png", 1919 * 4),
    ]
  );
}
