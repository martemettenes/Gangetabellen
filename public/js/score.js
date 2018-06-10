const scoreUi = document.querySelector('#score');
let score = 0;

function calculateScore() {
    scoreUi.innerHTML = score;

    if (wrongAnswer == false){
        score += correctAnswer;
        scoreUi.innerHTML = score;
        scoreUi.classList.add('scoreanimation');

        setTimeout(function () {
            scoreUi.classList.remove('scoreanimation');
        }, 3000);
    }
    
}