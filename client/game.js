document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);



let gameContainer = document.createElement("div"),
    maze = document.createElement("div"),


    player = document.createElement('div'),
    playerPos = {
        x: 0,
        y: 0
    },
    left = false,
    right = false,
    up = false,
    down = false,
    
    playerSpeed = 1,
    playerWidth = player.offsetWidth,
    playerHeight = player.offsetHeight;
// Append the variable gameContainer to the document
document.body.appendChild(gameContainer);
// Add the style of gameContainer to the variable
gameContainer.setAttribute("id", "gameContainer");
// Append the maze to the game container
gameContainer.appendChild(maze);
// Sets the newly created div to have the maze style
maze.setAttribute("id", "maze");
// Append player to the container
gameContainer.appendChild(player);
// Add player to the style class of player
player.classList.add("player");


// Set the position of the player x and y
playerPos.x = (gameContainer.offsetWidth / 2) - (player.offsetWidth / 2);
playerPos.y = gameContainer.offsetHeight - (player.offsetHeight * 2);

gameContainer.leftBoundary = 0;
gameContainer.rightBoundary = gameContainer.offsetWidth - player.offsetWidth;
gameContainer.topBoundary = 0;
gameContainer.bottomBoundary = gameContainer.offsetHeight - player.offsetHeight;


// We set variables to true and false so the player has a more enjoyable experience with smooth movement
function keyDown(e) {
    // If left arrow key or a is pressed set left to true
    if (e.keyCode == 37 || e.keyCode == 65) {
        left = true;
    }
    // If the right arrow key or d is pressed set right to true
    else if (e.keyCode == 39 || e.keyCode == 68) {
        right = true;
    }
    // If the up arrow key or w is pressed set up to true
    if (e.keyCode == 38 || e.keyCode == 87) {
        up = true;
    }
    // If the down arrow key or s is pressed set down to true
    else if (e.keyCode == 40 || e.keyCode == 83) {
        down = true
    }
}
// This function is the same as keyDown but for when the key is released
// Checks when the arrow keys are released and sets the corrosponding variable to false
function keyUp(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
        left = false;
    }
    else if (e.keyCode == 39 || e.keyCode == 68) {
        right = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        up = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        down = false;
    }
}
function movePlayer() {
    // If left is true then move the player left by playerSpeed
    if (left == true) {
        playerPos.x -= playerSpeed;

    }
    // If right is true then move the player right by playerSpeed
    else if (right == true) {
        playerPos.x += playerSpeed;

    }
    // If up is true then move the player up by playerSpeed
    if (up == true) {
        playerPos.y -= playerSpeed;
        
    }
    // If down is true then move the player down by playerSpeed
    else if (down == true) {
        playerPos.y += playerSpeed;
    
    }
    // Keeps the player inside the container once they are out of the maze
    if (playerPos.x < gameContainer.leftBoundary) {
        playerPos.x = gameContainer.leftBoundary;
    }
    if (playerPos.x > gameContainer.rightBoundary) {
        playerPos.x = gameContainer.rightBoundary;
    }
    if (playerPos.y < gameContainer.topBoundary) {
        playerPos.y = gameContainer.topBoundary;
    }
    if (playerPos.y > gameContainer.bottomBoundary) {
        playerPos.y = gameContainer.bottomBoundary;
    }
    player.style.left = playerPos.x + "px";
    player.style.top = playerPos.y + "px";

    function collisionDetect() {
        
    }
}
// Loops over the move player at 60 frames per second
function loop() {
    movePlayer();
    setTimeout(loop, 1000/60);
}
// Call loop so we can move
loop();