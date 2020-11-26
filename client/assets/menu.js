const socket = io();

// Implement the toggle function here because its small
// Get the leaderboard button from the page
const leaderboardBtn = document.getElementById("leaderboardBtn");
socket.emit("requestLeader")
leaderboardBtn.addEventListener("click", () => {
    // Assign x to the container element, so code is easier to read
    let x = document.getElementById("container");
    // If the display style of container is set to none then set it to be display type block
    if (x.style.display === 'none') {
        x.style.display = 'block';
    }
    // If its not set to none, then set it to be none
    else {
        x.style.display = 'none';
    }
});



socket.on("show", (result) => {
    console.log("results: " + result);

    const row = document.getElementById("row");
    const name = document.getElementById("name");
    const time = document.getElementById("time");

    name.setAttribute("value", result[0].user_name);
    name.setAttribute("value", result[0].score);

    name.setAttribute("value", result[0].user_name);
    score.setAttribute("value", result[0].score);


});
