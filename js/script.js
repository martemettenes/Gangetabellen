// Player stats
let lane = 1;

let max = 10;
let min = 1;
let maxA = 100;
let player = Math.floor( Math.random () * (max - min + 1) + min);
let partner = -1;
let correctAnswer = player * partner;

let wrongAnswer;


// GameUtilities
let hasReachedBottom = false;


// Game State Enum
GameStates = {
    Menu : 0,
    GetPartner : 1,
    UsePartner : 2
}
let gameState = GameStates.Menu;



const partnerAlt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let alternatives = [1,1,1];
//createPartners();

let numbersBar = null;

function startGame() {
    gameState = GameStates.GetPartner;
    //Create the numbersBar that contains the potential partner numbers.
    drawNumbersBar();
    setInterval(updateDistance, 50);

    // When game starts, draw Player
    drawPlayer();
    drawAlternatives(partnerAlt);
    displayFeedbackText();

}

// Random generate numbers for partner and add to html
function drawAlternatives(numbers) {
    partnerAlt.sort(function() {
        return .5 - Math.random();
    });

        numbersBar.innerHTML = "";
        for (var i = 0; i < 3; i++ ) {
            //document.querySelector('#numbersBar')
            numbersBar.innerHTML += '<div id="alt' + i + '" class="numberstyle">' + numbers[i] + '</div>';
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

            displayFeedbackText();

            // Update the Correct Answer
            correctAnswer = player * partner;

            // Switch GameState from 0 to 1
            gameState = GameStates.UsePartner;
            hasReachedBottom = false;
            //updateDistance();

            let mx, mn;
            mx = correctAnswer  * 1.4;
            if(mx > 100)
                mx = 100;
            mn = correctAnswer * 0.7;

            // Correct Answer alternatives
            let alt0 = Math.floor( Math.random () * (mx - mn)+mn);
            let alt1 = Math.floor( Math.random () * (mx - mn)+mn);
            while(alt0 == alt1 || alt1 == correctAnswer){
                alt0 = Math.floor( Math.random () * (mx - mn)+mn);
                alt1 = Math.floor( Math.random () * (mx - mn)+mn);
            }

            alternatives = [alt0, alt1, correctAnswer];

            // Shuffle answers
            alternatives.sort(function() {
                return .5 - Math.random();
            });

            drawNumbersBar();
            drawAlternatives(alternatives);
        break;


        // When the GameState is 1 - UsePartner
        case GameStates.UsePartner:
            displayFeedbackText();

            hasReachedBottom = false;
            updateDistance();

            let myAnswer = alternatives[lane];


            if (myAnswer != correctAnswer){
                wrongAnswer = true;
                displayFeedbackText();
            }

            if (myAnswer == correctAnswer){
                wrongAnswer = false;
                displayFeedbackText();
            }

            calculateScore();


            drawNumbersBar();
            //createPartners();
            drawAlternatives(partnerAlt);
            
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
        document.querySelector('#gange').innerHTML = 'Ja! Riktig svar er ' + correctAnswer + '!';
    }

    else if (gameState == GameStates.UsePartner && wrongAnswer == true){
        // document.querySelector('#gange').innerHTML = player + ' * ' + partner + ' = ' + correctAnswer;
        document.querySelector('#gange').innerHTML = 'Nei! Riktig svar er ' + correctAnswer + '!';
    }

}


// Move player when arrows is pressed
document.addEventListener(onkeydown, movePlayer);

function movePlayer (event){
    let keyPressed = event.keyCode;

    if (keyPressed == '37' && lane > 0) {
        lane --;
        
    }
    if (keyPressed == '39' && lane < 2) {
        lane ++;
    }
    if(keyPressed == '32'){
        pauseGame();
    }

    // Redraw player everytime a key/button is pressed
    drawPlayer();
}



// Place player in correct lane
function drawPlayer(){

    switch(lane){
        case 0:
        document.querySelector('#choose1').innerHTML =  '<div class="player"> ' + player + ' </div>'+
                                                        '<div class="partner"> ' + partner + ' </div>';
        document.querySelector('#choose2').innerHTML = '';
        document.querySelector('#choose3').innerHTML = '';
        break;
        case 1:
        document.querySelector('#choose1').innerHTML = '';
        document.querySelector('#choose2').innerHTML =  '<div class="player"> ' + player + ' </div>'+
                                                        '<div class="partner"> ' + partner + ' </div>';
        document.querySelector('#choose3').innerHTML = '';
        break;
        case 2:
        document.querySelector('#choose1').innerHTML = '';
        document.querySelector('#choose2').innerHTML = '';
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

    
/*

arrow keys are only triggered by onkeydown, not onkeypress

keycodes are:

left = 37
up = 38
right = 39
down = 40



*/
