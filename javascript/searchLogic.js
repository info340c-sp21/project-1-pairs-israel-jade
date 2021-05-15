// input moods

// choose whether want alcoholic or non-alcoholic drink

// get one drink per mood

// angry + alcoholic = "stop"

const DRINKS = {
    alcoholic: [
        {mood:'happy', drink:'Cuba Libre', author:'The Spruce Eats', link:'https://www.thespruceeats.com/rum-and-coke-recipe-760560'},
        {mood:'sad', drink:'The Whiskey Sour', author:'The Spruce Eats', link:'https://www.thespruceeats.com/whiskey-sour-recipe-761273'},
        {mood:'excited', drink:'Blue Margarita', author:'The Spruce Eats', link:'https://www.thespruceeats.com/blue-margarita-recipe-760849'},
        {mood:'tired', drink:'Vodka Red Bull', author:'Liqour. com', link:'https://www.liquor.com/recipes/vodka-red-bull/'},
        {mood:'angry', drink:'Uh oh, you should not be drinking alcohol! Please pick another mood or drink type.'}
    ],
    nonAlcoholic: [
        {mood:'happy', drink:'Low-Calorie Blueberry Smoothie', author:'The Spruce Eats', link:'https://www.thespruceeats.com/blueberry-smoothie-recipe-2238438'},
        {mood:'sad', drink:'Chocolate Milk', author:'The Spruce Eats', link:'https://www.thespruceeats.com/chocolate-milk-recipe-2355494'},
        {mood:'excited', drink:'Fresh Watermelon Lemonade', author:'The Spruce Eats', link:'https://www.thespruceeats.com/fresh-watermelon-lemonade-5071240'},
        {mood:'tired', drink:'Chocolate Coffee Protein Shake', author:'The Spruce Eats', link:'https://www.thespruceeats.com/chocolate-coffee-protein-shake-4031922'},
        {mood:'angry', drink:'Earl Grey Tea', author:'The Spruce Eats', link:'https://www.31daily.com/how-to-brew-earl-grey-tea/'}
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


// function to set all select options
setSelectOptions(moods, MOODS);
setSelectOptions(types, TYPES);

function setSelectOptions(subject, position) {
	subject.forEach(function(sub) {
		let option = document.createElement('option');
		option.setAttribute('value', sub);
		option.appendChild(document.createTextNode(sub));
		position.append(option);
	});
}


// function to update left-sidebar with answers
setChangeEvents(MOODS, ANSWERS);
setChangeEvents(TYPES, ANSWERS);

function setChangeEvents(options, listDestination) {
    options.addEventListener('change', function(option) {
        let listItems = listDestination.getElementsByTagName('li');
        
        let select = option.target;
        let value = select.value;

        let answer = document.createElement('li');
        answer.textContent = value;

        if (listItems.length == 2 && options == MOODS) {
            listDestination.replaceChild(answer, listItems[0]);
        } else if (listItems.length == 2 && options == TYPES) {
            listDestination.replaceChild(answer, listItems[1]);
        } else if (listItems.length == 1 && options == MATCH) {
            listDestination.replaceChild(answer, listItems[0]);
        } else {
            listDestination.appendChild(answer);
        }
    });
}


// For submission
let selectedMood;
let selectedType;

FORM.addEventListener('submit', function(event) {
	event.preventDefault();
	
	selectedMood = MOODS.value;
	selectedType = TYPES.value;
});


// Takes user to matching page
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
});


// Functions to render a drink
const MATCH = document.querySelector('.instructions-list');
const LINKS = document.querySelector('#links-list');
let drinkType;

function randomDrink() {
	let drinkKeys = Object.keys(DRINKS);
	let num = Math.floor(Math.random() * drinkKeys.length);
	drinkType = drinkKeys[num];
	num = Math.floor(Math.random() * DRINKS[drinkType].length)
	if (drinkType == 'alcoholic' && num == 4) {
		num = num - 1;
	}

    return renderDrink(drinkType, DRINKS[drinkType][num].mood);
}

let drink;
let link;
let author;

function renderDrink(drinkType, feeling) {
    if (drinkType == 'non-alcoholic') {
		drinkType = 'nonAlcoholic';
	}
	let getType = DRINKS[drinkType];

    let i = 0;

    getType.forEach(function() {
        if (getType[i].mood == feeling) {
            drink = getType[i].drink;
            link = getType[i].link;
            author = getType[i].author;
        }
		i++;
    });

	let match = document.createElement('p');
	//match.setAttribute('display', 'inline-block');
	match.textContent = drink;
    let newLink = renderLink(link, author);

    if (LINKS.children.length == 1) {
        LINKS.replaceChild(newLink, LINKS.children[0]);
    } else {
        LINKS.appendChild(renderLink(link, author));
    }

    MATCH.appendChild(match);
}


// Functions to add drink recipe link to list
function renderLink(drinkLink, drinkAuthor) {
    let href = document.createElement('a');
    href.setAttribute('href', drinkLink);
    href.setAttribute('target', "_blank");
    href.textContent = drinkAuthor;
    return href;
}

setChangeEvents(MATCH, LINKS);


// Add suggestion to list of other options
const SUG_DRINK = document.querySelector('#drinkSug');
const SUG_MOODS = document.querySelector('#moodSug');
const SUG_TYPES = document.querySelector('#typeSug');
const SUG_LINKS = document.querySelector('#linkSug');
const SUG_FORM = document.querySelector('#suggestion-form');

let sugDrink;
let sugMood;
let sugType;
let sugLink;

setSelectOptions(moods, SUG_MOODS);
setSelectOptions(types, SUG_TYPES);

SUG_FORM.addEventListener('submit', function(event) {
	event.preventDefault();
	
    sugDrink = SUG_DRINK.value;
	sugMood = SUG_MOODS.value;
	sugType = SUG_TYPES.value;
    if (SUG_LINKS.value != '') {
        sugLink = SUG_LINKS.value;
        console.log(sugLink);
    } else {
        sugLink = '';
    }
    renderSuggestions(sugDrink, sugMood, sugType, sugLink);
    SUG_FORM.reset();
});

const DRINKLIST = document.querySelector('.drink-side-list');

function renderSuggestions(enterName, enterMood, enterType, enterLink) {
    if (enterLink != '') {
        others = document.createElement('a');
        others.href = renderLink(enterLink, enterName);
        others.target = "_blank";
    } else {
        others = document.createElement('p');
    }

    others.innerHTML = enterMood + ' ' + enterType + ' = ' + enterName;

    DRINKLIST.appendChild(others);
    console.log(DRINKLIST.children);
}