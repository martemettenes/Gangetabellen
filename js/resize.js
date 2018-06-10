let numbersBarHeight;
let topGameHeight = -1;
let topGameWidth;
let gameHeight;



function initializeGameArea(){
    // Game stats
    numbersBarHeight = $('#numbersbar').height();
    topGameHeight = $("#topgame").height();
    topGameWidth = $("#topgame").width();
    gameHeight = topGameHeight - numbersBarHeight;
}

function resize(){
    const gameWidth = $("#game").width();
    
    const gangeTxt = document.querySelector('#gange');
    gangeTxt.style.width = gameWidth + "px";

    }
    