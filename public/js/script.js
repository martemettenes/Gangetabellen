const body = document.querySelector('body');
const howBtn = document.querySelector('.how-btn');

const gameInfo = document.querySelector('#game-info');

let gameLives = 5;

howBtn.addEventListener('mousedown', function () {
    gameInfo.classList.remove('hidden');
    howBtn.classList.add('hidden');

});


// Player stats
let lane = 1;

let max = 10;
let min = 1;
let maxA = 100;
let player = Math.floor( Math.random () * (max - min + 1) + min);
let partner = -1;
let correctAnswer = player * partner;

let wrongAnswer;

let totalGameScore = 0;


// GameUtilities
let hasReachedBottom = false;


// Game State Enum
GameStates = {
    Menu : 0,
    GetPartner : 1,
    UsePartner : 2
}
let gameState = GameStates.Menu;



//const partnerAlt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const partnerAlt = [1,2,3];
//const partnerAlt = getRandomValueByWeight(numbers);


let alternatives = [1,1,1];

let numbersBar = null;

function startGame() {
    gameLives = 5;
    body.classList.add('no-scroll');
    body.classList.add('blue-background');
    window.scrollTo(0, 0);

    for (var i = 0; i < 100; i++) {
        console.log(getRandomValueByWeight(numbers));
    }



    gameState = GameStates.GetPartner;
    //Create the numbersBar that contains the potential partner numbers.
    drawNumbersBar();
    setInterval(updateDistance, 50);

    // When game starts, draw Player
    drawPlayer();
    drawAlternatives(partnerAlt);
    chooseAlternativeOnTap();
    chooseLaneOnTap();
    displayFeedbackText();

}

// Random generate numbers for partner and add to html
function drawAlternatives(numberValue) {
     partnerAlt.sort(function() {
         return .5 - Math.random();
     });
    
    numbersBar.innerHTML = "";
    for (var i = 0; i < 3; i++ ) {
        //document.querySelector('#numbersBar')
        numbersBar.innerHTML += '<div id="alt' + i + '" class="numberstyle">' + numberValue[i] + '</div>';
    }
}




// Check the numbersBar, what number did the user choose?
function checkNumbersBar() {

    // Which GameState are we in?
    switch (gameState){
        case GameStates.Menu:

        break;
        // When the GameState is 0 - GetPartner
        case GameStates.GetPartner:
            partner = player;
            player = partnerAlt[lane];
            givePointsToArray(numbers, partnerAlt[lane]);

            displayFeedbackText();

            // Update the Correct Answer
            correctAnswer = player * partner;

            // Switch GameState from 0 to 1
            gameState = GameStates.UsePartner;
            hasReachedBottom = false;

            // Ability to tap numbers (for phone)
            chooseLaneOnTap();

            let max, min;
            max = correctAnswer  * 1.4;
            min = correctAnswer * 0.7;

            // Correct Answer alternatives
            let alt0 = Math.floor( Math.random () * (max - min)+min);
            let alt1 = Math.floor(Math.random() * (max - min) + min);
            let i = 0; //used to stop infinite while loop.
            while (alt0 == alt1 || alt1 == correctAnswer || alt0 == correctAnswer) {
                alt0 = Math.floor( Math.random () * (max - min)+min);
                alt1 = Math.floor(Math.random() * (max - min) + min);
                i++;
                if (i > 100) {
                    alt0 = Math.floor(min);
                    alt1 = Math.floor(max+1);
                }
            }

            alternatives = [alt0, alt1, correctAnswer];

            // Shuffle answers
            alternatives.sort(function() {
                return .5 - Math.random();
            });

            drawNumbersBar();
            drawAlternatives(alternatives);
            chooseAlternativeOnTap();
        break;


        // When the GameState is 1 - UsePartner
        case GameStates.UsePartner:

            hasReachedBottom = false;
            updateDistance();

            let myAnswer = alternatives[lane];

            chooseAlternativeOnTap();

            if (myAnswer != correctAnswer){
                wrongAnswer = true;
                displayFeedbackText();
            }

            if (myAnswer == correctAnswer){
                wrongAnswer = false;
                displayFeedbackText();
            }

            

            calculateScore();


            // Wait a little bit before next round is initiated
            setTimeout(function () {
                drawNumbersBar();
                for(let i = 0; i < 3; i ++){
                    partnerAlt[i] = getRandomValueByWeight(numbers);
                }
                drawAlternatives(partnerAlt);
            }, 800);
            

            chooseAlternativeOnTap();
            partner = -1;
            gameState = GameStates.GetPartner;
        break;
    }

    drawPlayer();
};

function drawNumbersBar() {
    const topGame = document.querySelector('#topgame');

    if (numbersBar != null){
        numbersBar.parentNode.removeChild(numbersBar);
    }

    numbersBar = document.createElement("div");
    topGame.appendChild(numbersBar);
    numbersBar.id = 'numbersbar';
    numbersBar.classList.add('numbersbar');
    numbersBar.classList.add('flex');
    numbersBar.classList.add('animation');

    if (gameLives == 0) {
        setTimeout(quitGame(), 4000);
    }
}

function createPartners() {
    // Partner Alternatives
    let partnerAlt0 = Math.floor( Math.random () * (max - min + 1) + min);
    let partnerAlt1 = Math.floor( Math.random () * (max - min + 1) + min);
    let partnerAlt2 = Math.floor( Math.random () * (max - min + 1) + min);

    partnerAlt = [partnerAlt0, partnerAlt1, partnerAlt2];

};


function displayFeedbackText(){

    if (gameState == GameStates.GetPartner && partner == -1){
        document.querySelector('#gange').innerHTML = 'Hva vil du gange med ' + player + '?';
    }

    else if (gameState == GameStates.GetPartner && partner >= 1 ){
        document.querySelector('#gange').innerHTML = 'Hva er ' + player + ' X ' + partner + '?';

    }

    else if (gameState == GameStates.UsePartner && wrongAnswer == false){
        document.querySelector('#gange').innerHTML = '<span class="correct-answer-text"> JA! </span> Riktig svar er ' + correctAnswer + '!';
    }

    else if (gameState == GameStates.UsePartner && wrongAnswer == true){
        // document.querySelector('#gange').innerHTML = player + ' * ' + partner + ' = ' + correctAnswer;
        document.querySelector('#gange').innerHTML = '<span class="correct-answer-text"> Ånei.. </span> Riktig svar er ' + correctAnswer + '!';
        gameLives -= 1;
    }

}


// Move player when arrows is pressed
document.addEventListener(onkeydown, movePlayer);

function movePlayer (event){
    let keyPressed = event.keyCode;

    if (keyPressed == '38'){
        numbersPos = gameHeight;
        setDistance(numbersPos);
    }

    if (keyPressed == '37' && lane > 0) {
        lane --; 
    }

    if (keyPressed == '39' && lane < 2) {
        lane ++;
    }


    if (keyPressed == '32' && pauseScreen.classList.contains('pause-screen-animation') && startScreen.classList.contains('hidden')){
        continueGame();
    }


    else if(keyPressed == '32' && startScreen.classList.contains('hidden')){
        pauseGame();
    }

    // Redraw player everytime a key/button is pressed
    drawPlayer();
}

function chooseAlternativeOnTap () {

    let alt0 = document.querySelector('#alt0');
    let alt1 = document.querySelector('#alt1');
    let alt2 = document.querySelector('#alt2');

    alt0.addEventListener('mousedown', function () {
        lane = 0;
        numbersPos = gameHeight;
        setDistance(numbersPos);
    })

    alt1.addEventListener('mousedown', function () {
        lane = 1;
        numbersPos = gameHeight;
        setDistance(numbersPos);
    })

    alt2.addEventListener('mousedown', function () {
        lane = 2;
        numbersPos = gameHeight;
        setDistance(numbersPos);
    })
}


function chooseLaneOnTap () {

    let choose1 = document.querySelector('#choose1');
    let choose2 = document.querySelector('#choose2');
    let choose3 = document.querySelector('#choose3');

    choose1.addEventListener('mousedown', function () {
        lane = 0;
        drawPlayer();
    })

    choose2.addEventListener('mousedown', function () {
        lane = 1;
        drawPlayer();
    })

    choose3.addEventListener('mousedown', function () {
        lane = 2;
        drawPlayer();
    })

}





// Place player in correct lane
function drawPlayer(){

    switch(lane){
        case 0:
        document.querySelector('#choose1').innerHTML =  '<div class="player"> ' + player + ' </div>'+
                                                        '<div class="partner"> ' + partner + ' </div>';
        document.querySelector('#choose2').innerHTML = '<div class="numberstyle empty"> </div>';
        document.querySelector('#choose3').innerHTML = '<div class="numberstyle empty"> </div>';
        break;
        case 1:
        document.querySelector('#choose1').innerHTML = '<div class="numberstyle empty"> </div>';
        document.querySelector('#choose2').innerHTML =  '<div class="player"> ' + player + ' </div>'+
                                                        '<div class="partner"> ' + partner + ' </div>';
        document.querySelector('#choose3').innerHTML = '<div class="numberstyle empty"> </div>';
        break;
        case 2:
        document.querySelector('#choose1').innerHTML = '<div class="numberstyle empty"> </div>';
        document.querySelector('#choose2').innerHTML = '<div class="numberstyle empty"> </div>';
        document.querySelector('#choose3').innerHTML =  '<div class="player"> ' + player + ' </div>'+
                                                        '<div class="partner"> ' + partner + ' </div>';
        break;
    }

    if (partner < 0){
        document.querySelector('.partner').classList.add('hidden');
    }

}


// PAUSE BUTTON

    const animations = document.getElementsByClassName('animation');

    const pauseBtn = document.querySelector('#pause');
    const continueBtn = document.querySelector('#continue');
    const quitBtn = document.querySelector('#quit');
    const pauseScreen = document.querySelector('#pausescreen');
    const text = document.getElementsByClassName('text');



    // When Pause button is pressed
    pauseBtn.addEventListener('mousedown', pauseGame);
    
    function pauseGame() {
        for (let i = 0; i < text.length; i++){
            text[i].classList.remove('text-fade-out');
            text[i].classList.add('text-fade-in'); 
        }
        pauseScreen.classList.remove('hidden');
        pauseScreen.classList.remove('continue-screen-animation');
        pauseScreen.classList.add('pause-screen-animation');
        document.querySelector('*').classList.add('pausegame');

        for (let i = 0; i < animations.length; i++){
            animations[i].classList.add('pausegame'); 
        }
    };

    // When Continue button is pressed
    continueBtn.addEventListener('mousedown', continueGame);
    
    function continueGame() {
        for (let i = 0; i < text.length; i++){
            text[i].classList.remove('text-fade-in');
            text[i].classList.add('text-fade-out');
        }
        pauseScreen.classList.remove('pause-screen-animation');
        pauseScreen.classList.add('continue-screen-animation');
        document.querySelector('*').classList.remove('pausegame');

        // Wait for animation before hiding div and continuing game
        setTimeout(function(){
            pauseScreen.classList.add('hidden');
            for (let i = 0; i < animations.length; i++){
                animations[i].classList.remove('pausegame');
           }
        }, 1000);
    };


    // QUIT GAME



    quitBtn.addEventListener('mousedown', quitGame);

    function quitGame() {
        let totalGameScoreDiv = document.querySelector('#total-score');
        let gameInfo = document.querySelector('#game-info');
        
        body.classList.remove('blue-background');
        howBtn.classList.add('hidden');
        startScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');

        totalGameScore += score;

        if (score > 0){
            howBtn.classList.remove('hidden');
            gameInfo.classList.add('hidden');
            totalGameScoreDiv.classList.remove('hidden');
            totalGameScoreDiv.innerHTML = '<h3> Din totale poengsum er </h3> <h1 class="total-score">' + totalGameScore + '</h1>';
        }

        score = 0;

        body.classList.remove('no-scroll');
        window.scrollTo(0, 0);
        
        pauseScreen.classList.add('continue-screen-animation');
    }
    


    
/*

arrow keys are only triggered by onkeydown, not onkeypress

keycodes are:

left = 37
up = 38
right = 39
down = 40
space = 32



*/
