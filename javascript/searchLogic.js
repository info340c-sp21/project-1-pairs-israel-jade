// input moods

// choose whether want alcoholic or non-alcoholic drink

// get one drink per mood

// angry + alcoholic = "stop"

const DRINKS = {
    alcoholic: [
        {mood:'happy', drink:'Rum & Coke'},
        {mood:'sad', drink:'Red wine'},
        {mood:'excited', drink:'Margarita'},
        {mood:'tired', drink:'Vodka Red Bull'},
        {mood:'angry', drink:'Uh oh, you should not be drinking alcohol!'}
    ],
    nonAlcoholic: [
        {mood:'happy', drink:'Blueberry Smoothie'},
        {mood:'sad', drink:'Chocolate Milk'},
        {mood:'excited', drink:'Monster Energy Drink'},
        {mood:'tired', drink:'Coffee'},
        {mood:'angry', drink:'Earl Grey Tea'}
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
const FORM = document.querySelector('form');

const SUG_MOODS = document.querySelector('#moodSug');
const SUG_TYPES = document.querySelector('#typeSug');
const SUG_FORM = document.querySelector('#suggestion-form');

setSelectOptions(moods, MOODS);
setSelectOptions(types, TYPES);
setSelectOptions(moods, SUG_MOODS);
setSelectOptions(types, SUG_TYPES);

// function to set all select options
function setSelectOptions(subject, position) {
	subject.forEach(function(sub) {
		let option = document.createElement('option');
		option.setAttribute('value', sub);
		option.appendChild(document.createTextNode(sub));
		position.append(option);
	});
}

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


// For submission
const DRINKNAME = document.querySelector('#drinkName')
/*
FORM.addEventListener('submit', function(event) {
	event.preventDefault();
	let pItems = DRINKNAME.getElementsByTagName('p');
	
	let selectedMood = MOODS.value;
	let selectedType = TYPES.value;
	console.log(renderDrink(selectedType, selectedMood));
	
	if (pItems.length == 1) {
		DRINKNAME.replaceChild(renderDrink(selectedType, selectedMood), pItems[0]);
	} else {
		DRINKNAME.appendChild(renderDrink(selectedType, selectedMood));
	}
	console.log(DRINKNAME);
});
*/
function renderDrink(drinkType, feeling) {
    if (drinkType == 'non-alcoholic') {
		drinkType = 'nonAlcoholic';
	}
	let getType = DRINKS[drinkType];
    let drink = '';

    let i = 0;

    getType.forEach(function() {
        if (getType[i].mood == feeling) {
            drink = getType[i].drink;
        }
		i++;
    });
	let match = document.createElement('p');
	//match.setAttribute('display', 'inline-block');
	match.textContent = drink;

    return match;
}