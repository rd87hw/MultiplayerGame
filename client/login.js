//TODO: Ask about how to get the login screen to run. ie when i run node index.js i see index.html but not the other 2 pages
// Take in the login information from the login screen
// TODO: How to either import from login.js or how to link the pages so app.js doesnt just respond to things on index.html
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-submit");
// Add an event listener to the button so when its clicked we take the username and password
loginBtn.addEventListener("click", e => {
    // Stop the page from refreshing
    e.preventDefault();

    const USERNAME = loginForm.username.value;
    const PASSWORD = loginForm.password.value
});