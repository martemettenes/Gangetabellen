// Get Alternatives-Bar/NumbersBar distance from top of game/screen
function updateDistance() {
    const numbersBar = document.querySelector('#numbersbar');
    let numbersPos = numbersBar.offsetTop;

    // When NumersBar position and gameHeight is equal, check what number the user chose as partner
    if (numbersPos >= gameHeight && hasReachedBottom == false) {
        hasReachedBottom = true;
        numbersBar.classList.add('hidden');

        // Check the lane the player is in and match with number
        checkNumbersBar();
    }


// Update numbersBar distance from top to bottom
};

function setDistance(number) {
    numbersPos = number;

    if (numbersPos >= gameHeight && hasReachedBottom == false) {
        hasReachedBottom = true;
        numbersBar.classList.add('hidden');

        // Check the lane the player is in and match with number
        checkNumbersBar();
    }


}

