const cardPool = [
    'BG', 'Marco', 'RV', 'Pauline', 'TG', 'T.Kratz', 'person7', 'person8'
];

let advancingCards = [...cardPool]; // Holds cards advancing to next round

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

let currentRoundPairs = []; // Stores current pairs

function updateRoundTitle() {
    const rounds = {
        16: "Round of 16",
        8: "Quarter Final",
        4: "Semi Final",
        2: "Final"
    };
    roundTitle.innerText = rounds[advancingCards.length] || "Final";
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startNewRound() {
    if (advancingCards.length === 1) {
        showWinner(advancingCards[0]); // Show final winner
        return;
    }

    updateRoundTitle();

    currentRoundPairs = shuffleArray([...advancingCards]); // Shuffle remaining cards
    advancingCards = []; // Reset advancing list for next round

    displayCards();
}

function displayCards() {
    if (currentRoundPairs.length < 2) {
        startNewRound(); // Move to next round if all pairs are done
        return;
    }

    const card1 = currentRoundPairs.pop(); // Get two cards
    const card2 = currentRoundPairs.pop();

    card1Img.src = `images/${card1}.jpg`;
    card2Img.src = `images/${card2}.jpg`;

    overlay1.classList.remove('show');
    overlay2.classList.remove('show');

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `${chosenCard} advances to the next round!`;

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

        advancingCards.push(chosenCard); // Move the chosen card to next round
        displayCards(); // Continue next pair or next round
    }, 2000);
}

function showWinner(winner) {
    roundTitle.innerText = "🏆 Tournament Winner! 🏆";
    result.innerText = `${winner} is the champion!`;
    winnerImg.src = `images/${winner}.jpg`;
    winnerName.innerText = winner;
    document.getElementById('cards').style.display = 'none';
    winnerSection.style.display = 'block';
}

// Start the first round
startNewRound();
