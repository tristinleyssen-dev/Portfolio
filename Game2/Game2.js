// htmlElements
let gameButton = document.getElementById("gameButton");
let pointText = document.getElementById("points");
let liveText = document.getElementById("lives");
let mainBox = document.getElementById("mainGame");
let shopButton = document.getElementById("shop");
let shopUI = document.getElementById("shopUI");

// sounds
let pianoClick = new Audio('579228__hugekc__note9.mp3');
let missBuzz = new Audio('720893__baggonotes__incorrect_buzz.wav');

// gameValues
let currentSize = 50;
let borderSize = 5;
let points = 0;
let gameSpeed = 40;
let levens = 3;

//booleans
let gameRunning = false;
let timer = null;

// randomLocationSpawn
function spawn() {
    gameButton.style.display = "block";
    let randomPosY = Math.floor(Math.random() * (445 - 100 + 1)) + 60;
    let randomPosX = Math.floor(Math.random() * (445 - 100 + 1)) + 60;
    gameButton.style.top = randomPosY + "px";
    gameButton.style.left = randomPosX + "px";
}

// randomGradientFunction
function randomGradient() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// De melodie van Undertale (versimpeld voor playbackRate)

const songPitches = [
    // De beroemde riff (D-D-D-A-Ab-G-F-D-F-G)
    // Deel 1 (Start op D)
    0.75, 0.75, 1.5, 1.12,
    1.06, 1.0, 0.89, 0.75, 0.89, 1.0,

    // Deel 2 (De riff verplaatst naar C)
    0.67, 0.67, 1.5, 1.12,
    1.06, 1.0, 0.89, 0.67, 0.89, 1.0,

    // Deel 3 (De riff verplaatst naar B)
    0.63, 0.63, 1.5, 1.12,
    1.06, 1.0, 0.89, 0.63, 0.89, 1.0,

    // Deel 4 (De riff verplaatst naar Bb)
    0.59, 0.59, 1.5, 1.12,
    1.06, 1.0, 0.89, 0.59, 0.89, 1.0
];

/*
const songPitches = [
    // Broe-der Ja-cob (C-D-E-C)
    1.0, 1.12, 1.26, 1.0, 
    1.0, 1.12, 1.26, 1.0, 

    // Slaapt gij nog? (E-F-G)
    1.26, 1.34, 1.5,
    1.26, 1.34, 1.5,

    // Al-le klok-ken luiden (G-A-G-F-E-C)
    1.5, 1.68, 1.5, 1.34, 1.26, 1.0,
    1.5, 1.68, 1.5, 1.34, 1.26, 1.0,

    // Bim bam bom (C-G-C)
    1.0, 0.75, 1.0,
    1.0, 0.75, 1.0
];*/

let noteIndex = 0;

// pianoSongPerClick
function pianoPitch() {
    let currentPitch = songPitches[noteIndex];

    pianoClick.currentTime = 0;
    pianoClick.preservesPitch = false;
    pianoClick.playbackRate = currentPitch;

    pianoClick.play();

    noteIndex++;
    if (noteIndex >= songPitches.length) {
        noteIndex = 0;
    }
}


// gameOverSound
function buzzSound() {
    missBuzz.currentTime = 0;
    missBuzz.play();

    setTimeout(() => {
        missBuzz.pause();
        missBuzz.currentTime = 0; 
    }, 200);
}

// pointAdder
function getPoint() {
    points += 1

    pointText.textContent = `Points: ${points}`
    if (points % 20 === 0 && gameSpeed > 10) {
        let gradient1 = randomGradient();
        let gradient2 = randomGradient();
        let r2 = Math.floor(Math.random() * 256);
        let g2 = Math.floor(Math.random() * 256);
        let b2 = Math.floor(Math.random() * 256);
        mainBox.style.backgroundImage = `linear-gradient(${gradient1}, ${gradient2}, ${gradient1})`
        mainBox.style.borderColor = `rgb(${r2},${g2},${b2})`
        gameSpeed -= 5;
    }
}



let isGameOver = false; // debounce

// whenNotClickedOnTime
function gameOver() {
    if (isGameOver) return;

    isGameOver = true;


    levens -= 1;
    liveText.textContent = `Lives: ${levens}`
    if (levens <= 0) {

        alert("Game Over! Points: " + points);
        location.reload();
        return;
    }

    buzzSound();
    setTimeout(function () {
        spawn();

        gameButton.style.borderColor = "rgba(192, 57, 43, 1.0)"
        setTimeout(() => {
            gameButton.style.borderColor = "";
        }, 400);


        currentSize = 60;
        borderSize = 6;
        isGameOver = false;
    }, 500);
}

// gameButtonSizeDecreaser
function decreaseSize() {

    clearInterval(timer);

    timer = setInterval(() => {
        currentSize -= 1;
        borderSize -= 0.08;

        if (currentSize <= 0) {
            gameOver();
            gameButton.style.display = "none";
        } else {
            gameButton.style.width = currentSize + "px";
            gameButton.style.height = currentSize + "px";
            gameButton.style.borderWidth = borderSize + "px";
        }
    }, gameSpeed);
}

// gameButtonClicker
gameButton.addEventListener("click", function () {
    this.style.borderColor = "rgba(46, 204, 113, 0.8)";
    setTimeout(() => {
        this.style.borderColor = "";
    }, 400);
    getPoint();
    pianoPitch();
    spawn();
    currentSize = 60;
    borderSize = 6;
    decreaseSize();
})

// shopOpener
shopButton.onclick = () => {
    if (shopUI.style.visibility == "visible") {
        shopUI.style.visibility = "hidden";
    } else {
        shopUI.style.visibility = "visible";
    }
};

// skinsChanger
shopUI.addEventListener('click', (event) => {
    let clickedSkin = event.target.closest('.shopSkin');
    if (clickedSkin) {
        let newColor = clickedSkin.getAttribute('data-color');
        gameButton.style.backgroundColor = newColor;
    }
});