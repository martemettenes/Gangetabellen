const startBtn = document.querySelector('.startgame');
const startScreen = document.querySelector('#start');
const gameScreen = document.querySelector('#game');

startBtn.addEventListener('mousedown', function () {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    score = 0;
    partner = -1;
    scoreUi.innerHTML = score;
    startGame();
    pauseScreen.classList.remove('pause-screen-animation');
        pauseScreen.classList.add('continue-screen-animation');
        document.querySelector('*').classList.remove('pausegame');
    initializeGameArea();
    resize();
})