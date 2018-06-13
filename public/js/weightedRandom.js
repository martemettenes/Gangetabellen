
// Declaring a function to create new Multiplicant
function numberMultiplicant(value, points) {
    this.value = value;
    this.points = points;
}



// Array of multiplicant-objects, consisting of a value and points(number of times used/calculated)
let numbers = [
    new numberMultiplicant (0, 0),
    new numberMultiplicant (1, 4),
    new numberMultiplicant (2, 5),
    new numberMultiplicant (3, 1),
    new numberMultiplicant (4, 2),
    new numberMultiplicant (5, 4),
    new numberMultiplicant (6, 1),
    new numberMultiplicant (7, 6),
    new numberMultiplicant (8, 1),
    new numberMultiplicant (9, 4),
    new numberMultiplicant (10, 2)
];



getTotalPoints(numbers);

// Add together all points in Numbers Array Objects
function getTotalPoints(array) {
    let totalPoints = 0;
    for (let i = 0; i < array.length; i++){
        totalPoints += array[i].points;
    }
    return totalPoints;

}


// Generate a random value from the array
function getRandomValueByWeight(objArray) {
    let rand = Math.floor(Math.random() * getTotalPoints(objArray)) + 1;

    // Subtract the points from the random number until we reach 0
    for (let i = 0; i < objArray.length; i++){
        rand -= objArray[i].points;
        

        // when we reach 0, what number.value are we currently on? Give points to all onther numbers, set this number.point to 0. 
        if (rand <= 0){
            return objArray[i].value;
        }
    }
}

// The function that gives points to all other values than the selected one
function givePointsToArray(objArray, indexToExclude) {
     for (let i = 0; i < objArray.length; i++){
         if (i != indexToExclude && objArray[i].points != 0){
             objArray[i].points ++;
         }
         else if(objArray[i].points != 0)
            objArray[i].points = 1;
     }
}



//console.log(getRandomValueByWeight(numbers));






