const cardPool = [
    'person1.jpg', 'person2.jpg', 'person3.jpg', 'person4.jpg',
    'person5.jpg', 'person6.jpg', 'person7.jpg', 'person8.jpg',
    'person9.jpg', 'person10.jpg', 'person11.jpg', 'person12.jpg',
    'person13.jpg', 'person14.jpg', 'person15.jpg', 'person16.jpg',
    'person17.jpg', 'person18.jpg', 'person19.jpg', 'person20.jpg'
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

    card1Img.src = `images/${card1}`;
    card2Img.src = `images/${card2}`;

    overlay1.style.display = 'none';
    overlay2.style.display = 'none';

    option1.onclick = () => chooseCard(card1, card2);
    option2.onclick = () => chooseCard(card2, card1);
}

function chooseCard(chosenCard, eliminatedCard) {
    result.innerText = `You chose ${chosenCard.replace('.jpg', '')}! ${eliminatedCard.replace('.jpg', '')} is eliminated.`;
    if (eliminatedCard === card1Img.src.split('/').pop()) {
        overlay1.style.display = 'flex';
    } else {
        overlay2.style.display = 'flex';
    }
    setTimeout(displayCards, 2000); // Display new cards after 2 seconds
}

displayCards();
