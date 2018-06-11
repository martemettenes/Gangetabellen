function numberMultiplicant(value, points) {
    this.value = value;
    this.points = points;
}

let numbers = [
    new numberMultiplicant (0, 0),
    new numberMultiplicant (1, 1),
    new numberMultiplicant (2, 1),
    new numberMultiplicant (3, 1),
    new numberMultiplicant (4, 1),
    new numberMultiplicant (5, 1),
    new numberMultiplicant (6, 1),
    new numberMultiplicant (7, 1),
    new numberMultiplicant (8, 1),
    new numberMultiplicant (9, 1),
    new numberMultiplicant (10, 1)
];

for (let i = 0; i < numbers.length; i++){
    //console.log(numbers[i]);
    
}
//console.log(getTotalPoints(numbers));


//console.log(getRandomValueByWeight(numbers));





function add(value1, value2){
    return value1 + value2;
}