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
const DRINKNAME = document.querySelector('#drinkName');
let selectedMood;
let selectedType;

FORM.addEventListener('submit', function(event) {
	event.preventDefault();
	
	selectedMood = MOODS.value;
	selectedType = TYPES.value;
});


$('.submit').on('click', function(){
	$("#insList").empty();
	$('.instructions-list').empty();
	$("#mesList").empty();
	$("#drinkImg").empty();
	$('.green').animate({ left: '-50px'},400, function(){
		$('.blue').animate({ left: '0px'},400)
	renderDrink(selectedType, selectedMood);
	});//can put callback function after linear
	$('.ingredients-box').fadeOut(400, function(){
		$('.instructions-box').fadeIn(400);
		$('.instructions-mini').fadeIn(400);
	});
	currentColor = "blue";

});


function randomDrink() {
	let drinkKeys = Object.keys(DRINKS);
	let num = Math.floor(Math.random() * drinkKeys.length);
	let drinkType = drinkKeys[num];
	console.log(num + ' ' + drinkType);

	num = Math.floor(Math.random() * DRINKS[drinkType].length)
	if (drinkType == 'alcoholic' && num == 4) {
		num = num - 1;
	}

	console.log(num);
	console.log(DRINKS[drinkType][num].mood);
    return renderDrink(drinkType, DRINKS[drinkType][num].mood);
}
//console.log(randDrink());

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

    document.querySelector('.instructions-list').appendChild(match);
}