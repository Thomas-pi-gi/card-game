const cardPool = [
    'person1.jpg', 'person2.jpg', 'person3.jpg', 'person4.jpg',
    'person5.jpg', 'person6.jpg', 'person7.jpg', 'person8.jpg',
    
];

let remainingCards = [...cardPool];

const card1Img = document.getElementById('card1Img');
const card2Img = document.getElementById('card2Img');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const result = document.getElementById('result');

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    return remainingCards.splice(randomIndex, 1)[0];
}

function displayCards() {
    const card1 = getRandomCard();
    const card2 = getRandomCard();

    card1Img.src = `images/${card1}`;
    card2Img.src = `images/${card2}`;

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `You chose ${chosenCard.replace('.jpg', '')}! ${eliminatedCard.replace('.jpg', '')} is eliminated.`;
    remainingCards.push(chosenCard);
    setTimeout(displayCards, 2000); // Display new cards after 2 seconds
}

displayCards();
