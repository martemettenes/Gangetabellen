const startBtn = document.querySelector('.startgame');
const startScreen = document.querySelector('#start');
const gameScreen = document.querySelector('#game');

startBtn.addEventListener('mousedown', function () {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    score = 0;
    scoreUi.innerHTML = score;
    startGame();
    initializeGameArea();
    resize();
})