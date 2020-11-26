function userName () {
    const loginForm = document.getElementById("login-form");
    const loginBtn = document.getElementById("login-submit");
    // Add an event listener to the button so when its clicked we take the username and password
    loginBtn.addEventListener("submit", e => {
    // Stop the page from refreshing
    e.preventDefault();

    export const USERNAME = loginForm.username.value;

    return USERNAME;
    }); 
    
}

function userPass() {
    const loginForm = document.getElementById("login-form");
    const loginBtn = document.getElementById("login-submit");

    loginBtn.addEventListener("submit", e => {
        e.preventDefault();

        export const PASSWORD = loginForm.password.value;
        return PASSWORD;
    })
    
}

