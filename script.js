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
        8: "Round of 8",
        4: "Quarter Final",
        2: "Semi Final",
        1: "Final"
    };
    roundTitle.innerText = rounds[advancingCards.length] || "Final";
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
    advancingCards = []; // Clear advancing cards to be refilled

    displayNextPair();
}

function displayNextPair() {
    if (currentRoundPairs.length < 2) {
        advancingCards = [...nextRoundCards]; // Move winners to next round
        startNewRound(); // Start new round
        return;
    }

    const card1 = currentRoundPairs.pop();
    const card2 = currentRoundPairs.pop();

    card1Img.src = `images/${card1}.jpg`;
    card2Img.src = `images/${card2}.jpg`;

    overlay1.style.display = "none";
    overlay2.style.display = "none";

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `${chosenCard} advances to the next round!`;

    // Show overlay on eliminated card
    if (eliminatedCard === card1Img.src.split('/').pop().replace('.jpg', '')) {
        overla
