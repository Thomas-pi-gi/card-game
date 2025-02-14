const story = document.getElementById('story');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');

let state = {};

function startGame() {
    state = {};
    showScene(1);
}

function showScene(sceneIndex) {
    const scenes = [
        {
            text: 'You find yourself standing at the edge of a dense forest. The sun is beginning to set, and you need to find shelter for the night.',
            options: [
                { text: 'Enter the Forest', nextScene: 2 },
                { text: 'Follow the Path', nextScene: 3 }
            ]
        },
        {
            text: 'You venture into the forest and find a cozy spot to set up camp.',
            options: [
                { text: 'Set up Camp', nextScene: 4 },
                { text: 'Explore Further', nextScene: 5 }
            ]
        },
        {
            text: 'You follow the path and come across a small village.',
            options: [
                { text: 'Enter the Village', nextScene: 6 },
                { text: 'Continue Along the Path', nextScene: 7 }
            ]
        },
        // Add more scenes as needed
        {
            text: 'You set up camp and enjoy a peaceful night under the stars.',
            options: [
                { text: 'Rest for the Night', nextScene: 8 },
                { text: 'Explore the Area', nextScene: 9 }
            ]
        },
        {
            text: 'You explore further and discover a hidden waterfall.',
            options: [
                { text: 'Take a Dip', nextScene: 10 },
                { text: 'Return to Camp', nextScene: 4 }
            ]
        },
        {
            text: 'You enter the village and meet friendly locals who offer you a place to stay.',
            options: [
                { text: 'Accept the Offer', nextScene: 11 },
                { text: 'Decline and Continue', nextScene: 7 }
            ]
        },
        {
            text: 'You continue along the path and find a mysterious cave.',
            options: [
                { text: 'Enter the Cave', nextScene: 12 },
                { text: 'Keep Walking', nextScene: 13 }
            ]
        },
        // Add more scenes as needed
    ];

    const scene = scenes[sceneIndex - 1];
    story.innerText = scene.text;
    option1.innerText = scene.options[0].text;
    option2.innerText = scene.options[1].text;
    option1.onclick = () => showScene(scene.options[0].nextScene);
    option2.onclick = () => showScene(scene.options[1].nextScene);
}

startGame();
