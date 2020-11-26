// Implement the toggle function here because its small
// Get the leaderboard button from the page
const leaderboardBtn = document.getElementById("leaderboardBtn");

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
