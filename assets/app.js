const socket = io()



// Starts a function so we can toggle the leaderboard
function toggleLeaderboard() {
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
}

const start = document.createElement("button");
document.body.appendChild(start);
start.innerHTML = "Submit Difficulty";
start.setAttribute("id", "genBtn");


// const build = document.getElementById("genBtn");


start.addEventListener('click', () => {
    
    
    let difficulty = document.getElementById("inputBox").value;

    socket.emit("start", difficulty)

    socket.on("output", grid => {
        // Set the maze to be nothing
    document.getElementById("maze").innerHTML = "";

    for (let i = 0; i < grid.length; i++) {
        let output = "<div>"
        for (let j = 0; j < grid.length; j++) {
            output += "<div class= '" + grid[i][j] + "'></div>"
        }
        output += "</div>";
        document.getElementById("maze").innerHTML += output;
    }
    // Listens for any keypress down then calls the movePlayer function
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);  


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
    })
});

let gameContainer = document.createElement("div"),
    maze = document.createElement("div"),
    player = document.createElement('div'),
    playerPos = {
        x: 0,
        y: 0
    },
    playerPrevPos = {
        x: -1,
        y: -1
    },
    left = false,
    right = false,
    up = false,
    down = false,
    
    playerSpeed = 4,
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
// Add a text box so the user can input difficulty
textDiff = document.createElement("input");
// Append the text box to the document
document.body.appendChild(textDiff);
// Give the new element the class style of inputBox
textDiff.setAttribute("type", "text");
textDiff.setAttribute("id", "inputBox");
textDiff.setAttribute("placeholder", "Difficulty");


// Set the position of the player x and y
playerPos.x = (gameContainer.offsetWidth / 2) - (player.offsetWidth / 2);
playerPos.y = gameContainer.offsetHeight - (player.offsetHeight * 2);

gameContainer.leftBoundary = 0;
gameContainer.rightBoundary = gameContainer.offsetWidth - player.offsetWidth;
gameContainer.topBoundary = 0;
gameContainer.bottomBoundary = gameContainer.offsetHeight - player.offsetHeight;


function movePlayer() {
    // If left is true then move the player left by playerSpeed
    if (left == true) {
        playerPos.x -= playerSpeed;
        playerPrevPos.x = playerPos.x
        if (collisionDetection()) {
            return;
        }
    }
    // If right is true then move the player right by playerSpeed
    else if (right == true) {
        playerPos.x += playerSpeed;
        playerPrevPos.x += playerSpeed
        if (collisionDetection()) {
            return;
        }
    }
    // If up is true then move the player up by playerSpeed
    if (up == true) {
        playerPos.y -= playerSpeed;
        playerPrevPos.y = playerPos.y
        if (collisionDetection()) {
            return;
        }
        
    }
    // If down is true then move the player down by playerSpeed
    else if (down == true) {
        playerPos.y += playerSpeed;
        playerPrevPos.y += playerSpeed
        if (collisionDetection()) {
            return;
        }
    }
    // // Keeps the player inside the container once they are out of the maze
    // if (playerPos.x < gameContainer.leftBoundary) {
    //     playerPos.x = gameContainer.leftBoundary;
    // }
    // if (playerPos.x > gameContainer.rightBoundary) {
    //     playerPos.x = gameContainer.rightBoundary;
    // }
    // if (playerPos.y < gameContainer.topBoundary) {
    //     playerPos.y = gameContainer.topBoundary;
    // }
    // if (playerPos.y > gameContainer.bottomBoundary) {
    //     playerPos.y = gameContainer.bottomBoundary;
    // }
    player.style.left = playerPos.x + "px";
    player.style.top = playerPos.y + "px";

    // Try set the boundary for the walls as above and if the players y or x is greater than the walls then set it to be equal to the walls

    //TODO: 
    // Store player coords, then check the players current coords against the array of wall coords
    // If there is no wall then allow the player to move
    // Else dont move the player

    // function Collide() {
    //     let wall = [];
    //     wall = document.querySelectorAll("div.wall")
    //     let wallCoords = [].slice.call(wall);
    //     for (let i = 0; i < wall.length; i++) {
    //         wallCoords[i] = wall[i].getBoundingClientRect();
    //         console.log(wallCoords[i])
    //     }
    // }
}  
// Loops over the move player at 60 frames per second
function loop() {
    movePlayer();
    setTimeout(loop, 1000/60);
}
// Call loop so we can move
loop();

function collisionDetection() {
    // Variables for collision with exit
    const exit = document.querySelector("div.exit");
    const exitRect = exit.getBoundingClientRect();
    // Variable for collision with player
    const playerRect = player.getBoundingClientRect();
    // Declare a variable wall that selects all the walls in the maze
    let wall = document.querySelectorAll("div.wall")
    // Declare an array that reads in all the walls of the array
    let wallArray = [].slice.call(wall);
    // Declare a second array that we can store the boundingClientRect objects in
    let wallRectArray = [];
    // Loop through the size of the array
    for (let i = 0; i < wallArray.length; i++) {
        // For each of the elements in the array get their bounding rects
        // This allows us to read in the x and y coords to check for collision later
        wallRectArray[i] = wallArray[i].getBoundingClientRect();
        /*
        getBoundingClientRect returns an object of type DOMRect. The object stores the coordiantes for:
        bottom, top, left, right, x and y, it also stores the height and width of the element. Using this we can read
        in the DOMRect object for each wall element and use it to compare against the player element for collision.
        If the players x value is less than the current wall elements x value + the elements width AND
        the player elements x value + width is more than the current wall elements x value AND
        the player elements y value is less than the current wall elements y value + its height AND
        the player elements y value + its height is greater than the walls y value then we have collision

        This works due to it testing for any space around these values
        This works only with squares and rectangles
        */
        if (playerRect.x < wallRectArray[i].x + wallRectArray[i].width &&
            playerRect.x + playerRect.width > wallRectArray[i].x &&
            playerRect.y < wallRectArray[i].y + wallRectArray[i].height &&
            playerRect.y + playerRect.height > wallRectArray[i].y) {
                // Log collision on what wall we are colliding with
                console.log("Collision on wall # " +[i]);

                console.log("Player Position: " + playerPos.x + ":" + playerPos.y);
                console.log("wall position : " + wallRectArray[i].x + ", " + wallRectArray[i].y);

                playerPos.x = wallRectArray[i].x + wallRectArray[i].width;
                playerPos.y = wallRectArray[i].y + wallRectArray[i].height;
                

                console.log(playerPos.x + " " + playerPos.y);

                // If we are colliding with a wall then return true so we can handle it
                return true;
        }
        if (playerRect.x < exitRect.x + exitRect.width &&
            playerRect.x + playerRect.width > exitRect.x &&
            playerRect.y < exitRect.y + exitRect.height &&
            playerRect.y + playerRect.height > exitRect.y) {
                end();
            }
    }    
}
// TODO:
// Move this to inside the maze generation event so the timer only starts when we click the button
// Declare variables needed for the timer
let timer = document.createElement("label"),
    sec = document.createElement("label"),
    min = document.createElement("label"),
    cont = document.createElement("div"),
    total = 0;
// Set the styles of the container
cont.setAttribute("id", "cont");
// Append the container to the document
document.body.appendChild(cont);
// Append the timer to the container
cont.appendChild(timer);

// Loops through this function once every second, giving us a timer
let stopInterval = setInterval(function count() {
    total++;
    timer.innerHTML = padding(parseInt(total / 60) + ":" + padding(total % 60))
}, 1000)
// Function to put 0's on the ends of the timer to make it look like a clock
function padding(value) {
    const valueString = value + "";

    if (valueString.length < 2) {
        return "0" + valueString;
    }
    else {
        return valueString;
    }
}
// TODO: Read the time and the username into the database for the given person
// TODO: Move the player somewhere when they have finished
function end() {
    // Take final time
    const FINAL_TIME = timer.innerHTML;
    // Set the timer to Finished
    timer.innerHTML = "FINISHED!"
    // Stop the clock from running after we change the text
    clearInterval(stopInterval);

    playerPos = {x: 0, y: 0};


    

    
}

// TODO: Possibly implement 2 players where they can race

