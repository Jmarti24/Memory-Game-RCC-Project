//Joaquin Martinez CIS 14A Memory Game

// In order to hold the images, I placed them in an array in order to display them later

const cardsArray = [
    {
        name: 'zero',
        img: 'zero.jpg',
    },
    {
        name: 'one',
        img: 'one.jpg',
    },
    {
        name: 'two',
        img: 'two.jpg',
    },
    {
        name: 'three',
        img: 'three.jpg',
    },
    {
        name: 'four',
        img: 'four.jpg',
    },
    {
        name: 'five',
        img: 'five.jpg',
    },

];

let gameGrid = cardsArray.concat(cardsArray); //Duplicate the cards needed for the game

// Need to grab the div with the id of game

const game = document.getElementById('game');

// Need to create a section element and give it a grid

const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

//Adding this node to the end of the parent node in the dom
game.appendChild(grid);

//Need to display the cards to make them visible and randomize them

gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach(item => {
    //Create a new div and make a class element
    const card = document.createElement('div');
    card.classList.add('card');
    //Name the div and add the back of the card image
    card.dataset.name = item.name;
    //Create a div for the front of the card
    const front = document.createElement('div');
    front.classList.add('front');
    //Create a div for the back of the card
    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`;
    //Add the div to the grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

let firstGuess = "";
let secondGuess= "";
let count = 0;
let delay = 1200;
let previousTarget = null;

//Creating a function to make cards disappear when matched

const match = () => {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add("match");
    })

};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    })
};

// Need to add an Event Listener

grid.addEventListener('click', function(event) {
    let clicked = event.target;
    if (clicked.nodeName === "SECTION" || clicked === previousTarget ||  clicked.parentNode.classList.contains('selected')) {
        return;
    }
    if (count < 2) {
        count++
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
    } if (firstGuess !== "" && secondGuess !== "") {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
    previousTarget = clicked;
}
});

