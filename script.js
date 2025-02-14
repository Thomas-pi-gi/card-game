const cardPool = [
    'BG', 'Marco', 'RV', 'Pauline', 'TG', 'T.Kratz', 'person7', 'person8'
];

let advancingCards = [...cardPool]; // Cards advancing to next round
let currentRoundPairs = []; // Pairs for current round
let nextRoundCards = []; // Cards that win in the current round

const card1Img = document.getElementById('card1Img');
const card2Img = document.getElementById('card2Img');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const result = document.getElementById('result');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');
const roundTitle = document.getElementById('roundTitle');
const winnerSection = document.getElementById('winnerSection');
const winnerImg = document.getElementById('winnerImg');
const winnerName = document.getElementById('winnerName');

function updateRoundTitle() {
    const rounds = {
        8: "Quarter Final",
        4: "Semi Final",
        2: "Final"
    };
    roundTitle.innerText = rounds[advancingCards.length] || "Winner";
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startNewRound() {
    if (advancingCards.length === 1) {
        showWinner(advancingCards[0]); // Display final winner
        return;
    }

    updateRoundTitle();

    // Shuffle and pair up the advancing cards
    currentRoundPairs = shuffleArray([...advancingCards]);
    nextRoundCards = [];
    advancingCards = []
