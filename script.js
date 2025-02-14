const cardPool = [
    'BG', 'Marco', 'RV', 'Pauline', 'TG', 'T.Kratz', 'person7', 'person8'
];

let remainingCards = [...cardPool];

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

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    return remainingCards.splice(randomIndex, 1)[0];
}

function updateRoundTitle() {
    const rounds = {
        16: "Round of 16",
        8: "Quarter Final",
        4: "Semi Final",
        2: "Final"
    };
    roundTitle.innerText = rounds[remainingCards.length] || "Final";
}

function displayCards() {
    if (remainingCards.length === 1) {
        showWinner(remainingCards[0]);
        return;
    }

    updateRoundTitle();

    const card1 = getRandomCard();
    const card2 = getRandomCard();

    card1Img.src = `images/${card1}.jpg`;
    card2Img.src = `images/${card2}.jpg`;

    overlay1.classList.remove('show');
    overlay2.classList.remove('show');

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `${chosenCard} moves to the next round!`;

    if (eliminatedCard === card1Img.src.split('/').pop().replace('.jpg', '')) {
        overlay1.classList.add('show');
    } else {
        overlay2.classList.add('show');
    }

    option1.disabled = true;
    option2.disabled = true;

    setTimeout(() => {
        option1.disabled = false;
        option2.disabled = false;
        remainingCards.push(chosenCard);
        displayCards();
    }, 2000
