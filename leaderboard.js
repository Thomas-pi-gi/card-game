const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbyy_IE-lP4Ax7PwfjM6TBEBptJnvPgbpSp21Gb4T0xoUlGzOY44a5BkMYxeZW3I9v_W/exec"; 

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
