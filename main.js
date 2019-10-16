const cardsColor = ["red", "red", "green", "green", "yellow", "yellow", "blue", "blue", "orange", "orange", "brown", "brown", "pink", "pink", "cadetblue", "cadetblue", "indigo", "indigo"];

let cards = document.querySelectorAll('div');

cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const showGame = function () {
    cards.forEach(card => {
        card.classList.add("new")
    })
};
showGame();

const tryAgain = function () {

    location.reload();
};



const form = document.querySelector('form');
const text = document.querySelector('h1.winner');
const input = document.querySelector('input');
const userName = document.querySelector('h1 span');
const userTime = document.querySelector('h2');
const newGame = document.querySelector('p.start');
const button = document.querySelector('button.start');


const addResult = (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    const nameValue = input.value;
    console.log(nameValue);
    const name = document.createElement('h1');
    name.className = 'winner';
    name.innerHTML = `Cześć ${nameValue}, miłej zabawy!`
    text.appendChild(name);
    const start = document.createElement('p');
    start.innerHTML = "<button>Start</button>";
    start.className = 'start';
    newGame.appendChild(start);
    input.value = "";
    start.addEventListener('click', init);



    if (input !== "") {
        form.removeEventListener('submit', addResult);
    }
}



form.addEventListener('submit', addResult);


const clickCard = function () {

    activeCard = this;

    if (activeCard == activeCards[0]) return;
    activeCard.classList.remove('hidden');

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard);
            activeCards[1] = activeCard;

            setTimeout(function (e) {
                if (activeCards[0].className === activeCards[1].className) {
                    activeCards.forEach(card => card.classList.add('off'));
                    gameResult++;
                    cards = cards.filter(card => !card.classList.contains('off'))
                    if (gameResult == gamePairs) {
                        const endTime = new Date().getTime();
                        const gameTime = Math.floor((endTime - startTime) / 1000);
                        // alert(`Gratulacje! Twój czas gry to: ${gameTime} sekund`);
                        const userTime = document.querySelector('h2');
                        const gameOver = () => {

                            userTime.className = 'gameTime';
                            userTime.innerHTML = `Gratulacje! Twój czas gry to: ${gameTime} sekund`;
                            const nextGame = document.querySelector('p');
                            nextGame.className = 'restart';
                            const restart = document.createElement('button');
                            restart.innerHTML = "Zagraj jeszcze raz!";
                            restart.className = "reset";

                            nextGame.appendChild(restart);

                            restart.addEventListener('click', tryAgain);
                        }
                        gameOver();

                    }
                } else {
                    activeCards.forEach(card => card.classList.add('hidden'))
                }

                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener('click', clickCard))
            }, 500)

        })
    }

};
const init = function () {
    document.querySelector('p').innerHTML = "";
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
        card.classList.remove("new");


    })

    setTimeout(function () {
        cards.forEach(card => {

            card.classList.add("hidden");
            card.addEventListener('click', clickCard)
        })
    }, 2000)

}