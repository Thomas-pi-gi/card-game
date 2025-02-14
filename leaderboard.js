const GOOGLE_SHEET_API = "https://script.google.com/u/0/home/projects/1-_fhE7aPrQxdcWX0A9K_c0ev7uNy_NPifLomeMh2U9HWYNCio44wTLKf/edit"; 

async function updateLeaderboard(winner) {
    await fetch(GOOGLE_SHEET_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: winner })
    });
    displayLeaderboard();
}

async function displayLeaderboard() {
    const response = await fetch(GOOGLE_SHEET_API);
    const data = await response.json();
    
    const leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";

    let scores = data.slice(1).sort((a, b) => b[1] - a[1]); 
    scores.forEach(([name, wins]) => {
        leaderboardDiv.innerHTML += `<p>${name}: ${wins} wins</p>`;
    });
}

window.updateLeaderboard = updateLeaderboard;
displayLeaderboard();
