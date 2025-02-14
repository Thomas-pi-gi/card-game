const cardPool = [
    'BG', 'Marco', 'RV', 'Pauline', 'TG', 'T.Kratz'
];

let remainingCards = [...cardPool];

const card1Img = document.getElementById('card1Img');
const card2Img = document.getElementById('card2Img');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const result = document.getElementById('result');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    return remainingCards.splice(randomIndex, 1)[0];
}

function displayCards() {
    const card1 = getRandomCard();
    const card2 = getRandomCard();

    card1Img.src = `images/${card1}.jpg`;
    card2Img.src = `images/${card2}.jpg`;

    overlay1.style.display = 'none';
    overlay2.style.display = 'none';

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `${chosenCard} avance à la prochaine chouffe!`;
    if (eliminatedCard === card1Img.src.split('/').pop().replace('.jpg', '')) {
        overlay1.style.display = 'flex';
    } else {
        overlay2.style.display = 'flex';
    }
    setTimeout(displayCards, 2000); // Display new cards after 2 seconds
}

displayCards();
