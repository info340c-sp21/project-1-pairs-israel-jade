const DRINKS = {
    alcoholic: [
        {mood:'happy', drink:'Rum & Coke'},
        {mood:'sad', drink:'Red wine'},
        {mood:'excited', drink:'Margarita'},
        {mood:'tired', drink:'Vodka Red Bull'},
        {mood:'angry', drink:'Uh oh, you should not be drinking!'}
    ],
    nonAlcoholic: [
        {mood:'happy', drink:''},
        {mood:'sad', drink:''},
        {mood:'excited', drink:''},
        {mood:'tired', drink:''},
        {mood:'so-and-so', drink:''},
        {mood:'angry', drink:''}
    ]
}

var moods = [
	"happy",
	"sad",
	"excited",
	"tired",
    "so-and-so",
	"angry"];
var types = [
    "alcoholic",
    "non-alcoholic"];

const MOODS = document.querySelector('#moods');
const TYPES = document.querySelector('#types');
const ANSWERS = document.querySelector('#answer-list');


// Set options to select
moods.forEach(function(mood) {
    let option = document.createElement('option');
    option.setAttribute('value', mood);
    option.appendChild(document.createTextNode(mood));
    MOODS.append(option);
});

types.forEach(function(type) {
    let option = document.createElement('option');
    option.setAttribute('value', type);
    option.appendChild(document.createTextNode(type));
    document.querySelector('#types').append(option);
});

// Update left-sidebar with answers
MOODS.addEventListener('change', function(mood) {
    let listItems = ANSWERS.getElementsByTagName('li');
    
    let select = mood.target;
    let value = select.value;
    
    let answer = document.createElement('li');
    answer.textContent = value;
    if (listItems.length == 2) {
        ANSWERS.replaceChild(answer, listItems[0]);
    } else {
        ANSWERS.appendChild(answer);
    }
});

TYPES.addEventListener('change', function(type) {
    let listItems = ANSWERS.getElementsByTagName('li');
    
    let select = type.target;
    let value = select.value;
    
    let answer = document.createElement('li');
    answer.textContent = value;

    if (listItems.length == 2) {
        ANSWERS.replaceChild(answer, listItems[1]);
    } else {
        ANSWERS.appendChild(answer);
    }
});



function renderDrink(drinkType, feeling) {
    let getType = DRINKS[drinkType];
    let drink = '';

    let i = 0;

    getType.forEach(function() {
        if (getType[i].mood == feeling) {
            drink = getType[i].drink;
        }
        console.log(getType[i]);
    });

    return drink;
}

console.log(renderDrink('alcoholic', 'angry'));