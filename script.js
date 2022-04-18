window.addEventListener("load", sidenVises);

//variabler og DOM-elementer

let point = 0;
let life = 3;
let myRandom;

//Timer
const time = document.querySelector("#time_board_container");

//Score
const spilPoints = document.querySelector("#score");

//Good
const citron = document.querySelector("#citron_container");
const gin = document.querySelector("#gin_container");
const isterninger = document.querySelector("#isterninger_container");
const tonic = document.querySelector("#tonic_container");

//Bad
const vodka = document.querySelector("#vodka_container");
const cola = document.querySelector("#cola_container");
const lime = document.querySelector("#lime_container");
const rom = document.querySelector("#rom_container");

//Liv
const liv1 = document.querySelector("#liv1");
const liv2 = document.querySelector("#liv2");
const liv3 = document.querySelector("#liv3");

//Lyd
const klir = document.querySelector("#klir");
const baggrundsmusik = document.querySelector("#baggrundsmusik");
const burp = document.querySelector("#burp");
const nice = document.querySelector("#nice");


//Skærme, knapper og points

const startScreen = document.querySelector("#start");
const playKnap = document.querySelector("#play_knap");
const howToShakeKnap = document.querySelector("#how_to_shake_knap");

const regelScreen = document.querySelector("#start2");
const startGameKnap = document.querySelector("#start_game_knap");

const gameOverScreen = document.querySelector("#game_over");
const gameOverPoints = document.querySelector("#game_over_points");
const gameOverKnap = document.querySelector("#play_again1");

const lvlComplete = document.querySelector("#level_complete");
const lvlCompletePoints = document.querySelector("#level_complete_points");
const lvlCompleteKnap = document.querySelector("#play_again2");

//const lydOn = document.querySelector("#lyd_on");
//const lydOff = document.querySelector("#lyd_off");


//.................Startskærm.........................//

function sidenVises() {
    console.log("sidenVises");

    //Vis/skjul skærme
    regelScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    lvlComplete.classList.add("skjul");

    //Animation på knapper
    playKnap.classList.add("pulse");
    howToShakeKnap.classList.add("pulse2");

    //Klik på knap til start spil
    playKnap.addEventListener("click", playGame);

    //Klik på knap til regler
    howToShakeKnap.addEventListener("click", regelGame);
}

//.................Regelskærm.........................//

function regelGame() {
    console.log("regelGame");

    //Vis/skjul skærme
    regelScreen.classList.remove("skjul");
    startScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    lvlComplete.classList.add("skjul");

    //Oprydning
    howToShakeKnap.removeEventListener("click", regelGame);

    //Klik på knap til start spil
    startGameKnap.addEventListener("click", playGame);
}

//.................Spilskærm.........................//

function playGame() {
    console.log("playGame");

    //Vis/skjul skærme
    startScreen.classList.add("skjul");
    regelScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    lvlComplete.classList.add("skjul");

    //vis/skjul lydknapper
    //    lydOff.classList.add("skjul");

    //Klik på lyd-symbol
    //    lydOn.addEventListener("click", fjernLyd);

    //Oprydning
    startGameKnap.removeEventListener("click", playGame);
    gameOverKnap.removeEventListener("click", playGame);
    lvlCompleteKnap.removeEventListener("click", playGame);

    //start lyd på elementer
    baggrundsmusik.currentTime = 0;
    baggrundsmusik.play();

    //Nulstil point og udskriv
    point = 0;
    score.innerHTML = point;

    //reset liv til 3
    life = 3;

    //animationen "hide" efter genstart
    liv1.classList.remove("hide");
    liv2.classList.remove("hide");
    liv3.classList.remove("hide");

    //start en timer-animation
    time.classList.add("pulse");
    time.firstElementChild.classList.add("time");


    //elementer falder
    citron.classList.add("falling", "pos1", "speed1");
    gin.classList.add("falling", "pos2", "speed2");
    isterninger.classList.add("falling", "pos5", "speed3");
    tonic.classList.add("falling", "pos6", "speed4");

    vodka.classList.add("falling", "pos3", "speed1");
    cola.classList.add("falling", "pos4", "speed2");
    lime.classList.add("falling", "pos7", "speed3");
    rom.classList.add("falling", "pos8", "speed4");

    //klik på elementer
    citron.addEventListener("mousedown", clickGood);
    gin.addEventListener("mousedown", clickGood);
    isterninger.addEventListener("mousedown", clickGood);
    tonic.addEventListener("mousedown", clickGood);

    vodka.addEventListener("mousedown", clickBad);
    cola.addEventListener("mousedown", clickBad);
    lime.addEventListener("mousedown", clickBad);
    rom.addEventListener("mousedown", clickBad);

    //elementer faldet ned uden klik
    citron.addEventListener("animationiteration", goodReset);
    gin.addEventListener("animationiteration", goodReset);
    isterninger.addEventListener("animationiteration", goodReset);
    tonic.addEventListener("animationiteration", goodReset);

    vodka.addEventListener("animationiteration", badReset);
    cola.addEventListener("animationiteration", badReset);
    lime.addEventListener("animationiteration", badReset);
    rom.addEventListener("animationiteration", badReset);

    //Lytter efter om tiden er gået
    time.firstElementChild.addEventListener("animationend", stopSpillet);
}

//....................ved-good-klik......................//


function clickGood() {
    console.log("this");

    //start forsvind-animation
    this.firstElementChild.classList.add("forsvind");

    //start lyd på elementer
    klir.currentTime = 0;
    klir.play();

    // få point
    point++;
    spilPoints.textContent = point;

    //forsvind-animation ender 
    this.addEventListener("animationend", goodReset);
}

//....................efter-good-klik......................//

function goodReset() {
    console.log("this");

    //fjernelse af classes
    this.classList = "";
    this.firstElementChild.classList = "";

    //definer random position
    myRandom = Math.floor(Math.random() * 8) + 1;
    console.log(myRandom);

    //definer random speed
    myRandom = Math.floor(Math.random() * 3) + 1;
    console.log(myRandom);

    //tving side til at indlæse elementer igen på ny måde
    this.offsetHeight;
    this.classList.add("pos" + myRandom, "falling");
    this.classList.add("speed" + myRandom);
}

//.....................ved-bad-klik.....................//

function clickBad() {
    console.log("this");

    //start forsvind_roter-animation
    this.firstElementChild.classList.add("forsvind_roter");

    //mist liv
    document.querySelector("#liv" + life).classList.add("hide");
    life--;

    //forsvind_roter-animation ender
    this.addEventListener("animationend", badReset);

    //Få spillet til at stoppe når der ikke er flere liv tilbage
    if (life <= 0) {
        console.log("life <= 0");
        stopSpillet();
    }
}

//.....................efter-bad-klik.....................//

function badReset() {
    console.log("this");

    //fjernelse af classes
    this.classList = "";
    this.firstElementChild.classList = "";

    //definer random position
    myRandom = Math.floor(Math.random() * 8) + 1;
    console.log(myRandom);

    //definer random speed
    myRandom = Math.floor(Math.random() * 3) + 1;
    console.log(myRandom);

    //tving side til at indlæse elementer igen på ny måde
    this.offsetHeight;
    this.classList.add("pos" + myRandom, "falling");
    this.classList.add("speed" + myRandom);
}

//...................når spillet stopper.......................//

function stopSpillet() {
    console.log("stopSpillet");

    //Stop timer
    time.firstElementChild.classList = "";
    time.classList = "";
    time.removeEventListener("animationend", stopSpillet);

    //fjernelse af alle animationer på sprite og container
    citron.classList = "";
    citron.firstElementChild.classList = "";
    citron.removeEventListener("mousedown", clickGood);
    citron.firstElementChild.removeEventListener("animationend", goodReset);

    gin.classList = "";
    gin.firstElementChild.classList = "";
    gin.removeEventListener("mousedown", clickGood);
    gin.firstElementChild.removeEventListener("animationend", goodReset);

    isterninger.classList = "";
    isterninger.firstElementChild.classList = "";
    isterninger.removeEventListener("mousedown", clickGood);
    isterninger.firstElementChild.removeEventListener("animationend", goodReset);

    tonic.classList = "";
    tonic.firstElementChild.classList = "";
    tonic.removeEventListener("mousedown", clickGood);
    tonic.firstElementChild.removeEventListener("animationend", goodReset);

    vodka.classList = "";
    vodka.firstElementChild.classList = "";
    vodka.removeEventListener("mousedown", clickBad);
    vodka.firstElementChild.removeEventListener("animationend", badReset);

    cola.classList = "";
    cola.firstElementChild.classList = "";
    cola.removeEventListener("mousedown", clickBad);
    cola.firstElementChild.removeEventListener("animationend", badReset);

    lime.classList = "";
    lime.firstElementChild.classList = "";
    lime.removeEventListener("mousedown", clickBad);
    lime.firstElementChild.removeEventListener("animationend", badReset);

    rom.classList = "";
    rom.firstElementChild.classList = "";
    rom.removeEventListener("mousedown", clickBad);
    rom.firstElementChild.removeEventListener("animationend", badReset);


    //Definer om man har vundet eller tabt 
    if (life <= 0) {
        gameOver();
    } else if (point >= 20) {
        levelComplete();
    } else {
        gameOver();
    }
}

//...................game over.......................//


function gameOver() {
    console.log("gameOver");

    // Vis game over skærm
    gameOverScreen.classList.remove("skjul");

    //start lyd
    burp.play();

    //Animation og pointudskrivning
    gameOverPoints.classList.add("pulse");
    gameOverPoints.textContent = point + " points";

    //lav clickfunction
    gameOverKnap.addEventListener("click", playGame);
}

//..................level complete........................//


function levelComplete() {
    console.log("levelComplete");

    // Vis level complete skærm
    lvlComplete.classList.remove("skjul");

    //start lyd
    nice.play();

    //Animation og pointudskrivning
    lvlCompletePoints.classList.add("pulse");
    lvlCompletePoints.textContent = point + " points";

    //lav clickfunction
    lvlCompleteKnap.addEventListener("click", playGame);
}

//..................fjern lyd ved klik........................//
//function fjernLyd() {
//    console.log("fjernLyd");
//}
