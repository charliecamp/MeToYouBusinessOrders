const PASSWORD = "Maisie.06";

function login() {
    const password = document.getElementById("password").value;

    if (password === PASSWORD) {
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function togglePassword() {
    const passwordField = document.getElementById("password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

document.getElementById("password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});
