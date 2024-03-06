let canvas;
let world;
let keyboard = new Keyboard();
let menuSound = new Audio("audio/menu.mp3");
let soundOn = true;
let intervalIds= [];

menuSound.volume = 0.3;
menuSound.autoplay = true;
menuSound.play();

/**
 * Initalize the game, load the canvas and a new world
 *
 */
function init() {
  startingSequence();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  menuSound.pause();
  allSoundsOff(soundOn);
}

/**
 * Cover the startscreen and removes buttons. 
 *
 */
function startingSequence() {
  document.getElementById("canvas").style.display = "block";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("mutingSounds").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "none";
  initLevel();
}

/**
 * Remove the Canvas so that the endscreen can show up
 *
 */
function endSequence() {
  document.getElementById("canvas").style.display = "none";
}

/**
 * Toggles the sound for the game on or off.
 *
 */
function toggleMuting() {
  let mute = document.getElementById("mutingImage");
  
  if (mute.src.includes("img/mute.png")) {
    soundOn = false;
    menuSound.muted = false;
    mute.src = "img/volume.png";
  } else if (mute.src.includes("img/volume.png")) {
    soundOn = true;
    menuSound.muted = true;
    mute.src = "img/mute.png";
  }
}

/**
 * Toggles the overlay for the description how to play.
 *
 */
function toggleHowToPlay() {
  let howTo = document.getElementById("howToMenu");

  if (howTo.style.display === "none") {
    howTo.style.display = "block";
  } else {
    howTo.style.display = "none";
  }
}

/**
 * At the Endscreen you can restart the game by clicking on the restart button.
 *
 */
function restartGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);

    init();
}

/**
 * Mutes all the sounds in the world class
 *
 * @param {false/true} soundOn - parameter to check, if the sound is allready on or off
 */
function allSoundsOff(soundOn) {
  world.coinAudio.muted = soundOn;
  world.endbossAudio.muted = soundOn;
  world.gameOverAudio.muted = soundOn;
  world.hurtEndbossAudio.muted = soundOn;
  world.hurtChickenAudio.muted = soundOn;
  world.walking_sound.muted = soundOn;
  world.jumping_sound.muted = soundOn;
  world.gameOverAudio.muted = soundOn;
  world.hurtAudio.muted = soundOn;
  menuSound.muted = soundOn;
  world.throwAudio.muted = soundOn;
}

/** 
 * Some key listener for the keyboard to work. Checks if the button or the mobile button is clicked or released 
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.key === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.key === "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.key === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = false;
  }
});

document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true
});

document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true
});

document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true
});

document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true
});

document.getElementById('leftBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false
});

document.getElementById('rightBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false
});

document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false
});

document.getElementById('throwBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false
});

/**
* Listener for checking, if the device is in landscape mode
*/
window.addEventListener('load', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * Checks the window width and heigth and show up a message if device is not in landscape mode.
 *
 */
function checkOrientation() {
    const landscapeMessage = document.getElementById('landscapeMessage');

    if (window.innerWidth < window.innerHeight) {
      landscapeMessage.style.display = 'block';
    } else {
      landscapeMessage.style.display = 'none';
    }
}