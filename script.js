const cardPool = [
    'Baptiste', 'Marco', 'RV', 'Pauline', 'JB', 'Augustin', 'charles-de-loisy', 'amandine',
    'T.Kratz', 'TG', 'Alexandre', 'Freddy', 'Alexandre RB', 'Davide x Alessandro'
];

let advancingCards = []; // Cards advancing to next round
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
const replayButton = document.getElementById('replayButton');

const leaderboardUrl = 'https://script.google.com/macros/s/AKfycbwcpgAElgWGtPrsCPqyRdXpK6pbnsRGKTkpciQr0ckCdDXBGFnR8IrR4T9GOt_QLAUg/exec'; // Replace with your Google Apps Script web app URL

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

    option1.innerText = `Choose ${card1}`;
    option2.innerText = `Choose ${card2}`;

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `${chosenCard} advances to the next round!`;

    // Show overlay on eliminated card
    if (eliminatedCard === card1Img.src.split('/').pop().replace('.jpg', '')) {
        overlay1.style.display = "flex";
    } else {
        overlay2.style.display = "flex";
    }

    option1.disabled = true;
    option2.disabled = true;

    setTimeout(() => {
        option1.disabled = false;
        option2.disabled = false;

        nextRoundCards.push(chosenCard); // Add to next round
        displayNextPair(); // Continue to the next pair
    }, 500);
}

function showWinner(winner) {
    winnerSection.style.display = "block";
    winnerImg.src = `images/${winner}.jpg`;
    winnerName.innerText = `${winner} is the winner!`;
    document.getElementById('cards').style.display = "none";
    result.style.display = "none";

    // Update global leaderboard
    updateLeaderboard(winner);

    // Ensure the replay button is visible and clickable
    replayButton.style.display = "block";
    replayButton.disabled = false;

    // Add event listener to the replay button
    replayButton.onclick = () => {
        location.reload(); // Reload the page to restart the game
    };
}

async function updateLeaderboard(winner) {
    try {
        const response = await fetch(leaderboardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: winner, points: 1 }),
        });

        if (response.ok) {
            console.log('Leaderboard updated successfully');
            displayLeaderboard();
        } else {
            const errorData = await response.json();
            console.error('Failed to update leaderboard:', errorData);
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

async function displayLeaderboard() {
    const response = await fetch(leaderboardUrl);
    const data = await response.json();

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    data.forEach(({ player, points }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${player}</span><span class="points">${points} points</span>`;
        leaderboardList.appendChild(listItem);
    });
}

// Call displayLeaderboard initially to show the leaderboard
displayLeaderboard();

// Start the first round of the game
function startGame() {
    // Pick 8 random cards from the pool
    advancingCards = shuffleArray([...cardPool]).slice(0, 8);
    startNewRound();
}

startGame();
