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


// Initialise global variable
let grid;

function mazeGen(size) {
    // Create an array initialised to grid
    grid = new Array();
    // Loop through the array and create a new array for each element in the first array
    // We are creating a 2d array
    for (let i = 0; i < size; i++) {
        grid[i] = new Array();
        // Loop through each element of the 2d array and set it to be an empty string
        for (let j = 0; j < size; j++) {
            grid[i][j] = "";
        }
    }
    

    drawOuterWalls();
    let entrance = addDoor();
    // minX = 1, maxX = grid.length - 2, minY = 1, maxY = grid.length - 2
    drawInnerWalls(true, 1, grid.length - 2, 1, grid.length - 2, entrance);
    displayMaze();
}

function drawOuterWalls() {
    // Loop through each row of the grid
    for (let i =  0; i < grid.length; i++) {
        // If ith row is 0 or is the last row in the square then add a wall
        // We have grid.length - 1 because we start at 0 in the array
        if (i == 0 || i == grid.length -1) {
            // Loop through the each column and add a wall
            for (let j = 0; j < grid.length; j++) {
                grid[i][j] = "wall";
                
            }
        }
        else {
            // If the row isnt the first or last
            // Add a wall on every row in the first column
            grid[i][0] = "wall";
            // Add a wall on every row in the last column
            grid[i][grid.length -1] = "wall";
        }
    }
    
}

function randNumber (minimum, maximum) {
    // return a random integer between the min and max values
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

function drawHorizontalWall(minimumX, maximumX, wallOnY) {
    // Define where holes can be placed
    // A random number between the maximum and minimum values is picked 
    // To stop holes being covered up by walls we will only allow walls to be placed on even cells and holes to be placed in odd cells
    let hole = Math.floor(randNumber(minimumX, maximumX)/2)*2+1

    // Set i to be the minimumX value and loop until it is the maximumX value
    for (let i = minimumX; i <= maximumX; i++) {
        // If i finds a hole, then set it to be the empty string, so we can pass through it
        if (i == hole) {
            // We use wallY here because we need to know how high up the grid we can place our wall if its horizontal
            grid[wallOnY][i] = "";
        }
        // If i is not a hole then
        else {
            // Set it to be a wall so we cannot pass through it
            grid[wallOnY][i] = "wall";
        }
    }
}

function drawVerticalWall(minimumY, maximumY, wallOnX) {
    // Same as above, we let hole be a random number between the min and max Y values on our line
    // We also set it to be an odd number so no walls interesct the holes preventing us from passing through
    let hole = Math.floor(randNumber(minimumY, maximumY)/2)*2+1

    // set i to be the minimumY value and loop through each Y value until we get to the max
    for (let i = minimumY; i <= maximumY; i++) {
        // If the current value i is a hole
        if (i == hole) {
            // Set the hole to be an empty string so we can pass through it
            // Use wallX here as we need to know how far along to place our vertical wall
            grid[i][wallOnX] = "";
        }
        // If i is not a hole then
        else {
            // Set the space to be a wall so we cannot pass through it
            grid[i][wallOnX] = "wall";
        }
    }
}

function drawInnerWalls(isDone, minimumX, maximumX, minimumY, maximumY, gate) {
    if (isDone) {
        // Base case, stops us from getting 2 wide walls
        if (maximumX - minimumX < 2) {
            return;
        }
        // Recursive case
        else {
        // Declaring variable that determines where on the Y axis a wall will be placed
        let wallOnY = Math.floor(randNumber(minimumY, maximumY)/2)*2; // Must be even to stop intersecting with holes
        // Now call the draw wall function so we can draw the wall passing the correct parameters
        drawHorizontalWall(minimumX, maximumX, wallOnY);

        // Now we recursively add more walls using the methods above
        // Need minimumX and maxX for the vertical walls
        // Need minY to determine where the start is
        // Need wallOnY - 1 to determine where the new max is for the next wall
        drawInnerWalls(!isDone, minimumX, maximumX, minimumY, wallOnY - 1, gate);
        // Need to call recursively for the second half of the maze
        // Need the first 3 as above
        // Need the wallOnY + 1 to determine where the new section begins
        // maxY is used to determine the maxY value as before
        drawInnerWalls(!isDone, minimumX, maximumX, wallOnY + 1, maximumY, gate);
        }
    }
    else {
        // Same as above but with Y values
        if (maximumY - minimumY < 2) {
            return;
        }
        else {
            // Declare variable that determines where on the x axis we can make a new wall
            let wallOnX = Math.floor(randNumber(minimumX, maximumX,)/2)*2; // Must be even so we dont intersect with any holes
            // Call the draw wall method
            drawVerticalWall(minimumY, maximumY, wallOnX);
            // Recursively call the the draw inner walls method passing the new parameters as needed (SAME AS ABOVE BUT CHANGE X AND Y)
            drawInnerWalls(!isDone, minimumX, wallOnX - 1, minimumY, maximumY, gate);
            // Same as before but change X and Y
            drawInnerWalls(!isDone, wallOnX + 1, maximumX, minimumY, maximumY, gate);

        }
    }
}

function addDoor() {
    // Randomly add a door to the maze keeping it on an odd number so no walls block the door
    let x = Math.floor(randNumber(1, grid.length - 1)/2)*2+1;
    // Call the element door
    grid[grid.length -1][x] = "door";
}

// ---Think of better way to display using DOM---

function displayMaze() {
    // Set the maze to be nothing
    document.getElementById("maze").innerHTML = "";

    let div1 = document.createElement("div")
    for (let i = 0; i < grid.length; i++) {
        let output = "<div>"
        for (let j = 0; j < grid.length; j++) {
            output += "<div class= '" + grid[i][j] + "'></div>"
         }
         output += "</div>";
         document.getElementById("maze").innerHTML += output;
    }
}
// Listens for any keypress down then calls the movePlayer function
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
        if (collisionDetection() == true) {
            playerPos.x += playerSpeed;
        }
    }
    // If right is true then move the player right by playerSpeed
    else if (right == true) {
        playerPos.x += playerSpeed;
        if (collisionDetection() == true) {
            playerPos.x -= playerSpeed;
        }
    }
    // If up is true then move the player up by playerSpeed
    if (up == true) {
        playerPos.y -= playerSpeed;
        if (collisionDetection() == true) {
            playerPos.y += playerSpeed;
        }
    }
    // If down is true then move the player down by playerSpeed
    else if (down == true) {
        playerPos.y += playerSpeed;
        if (collisionDetection() == true) {
            playerPos.y -= playerSpeed;
        }
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
}
// Loops over the move player at 60 frames per second
function loop() {
    movePlayer();
    setTimeout(loop, 1000/60);
}
// Call loop so we can move
loop();

function collisionDetection(isColliding) {
    let playerRect = player.getBoundingClientRect();
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
                // If we are colliding with a wall then return true so we can handle it
                return isColliding = true;
            }
    }  
}


