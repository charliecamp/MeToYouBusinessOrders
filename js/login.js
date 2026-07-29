// Password elements
const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("togglePassword");
const showCheckbox = document.getElementById("showPassword");
const loginButton = document.querySelector(".loginButton");

// Your login password
const correctPassword = "Maisie.06";

// Show / hide password
function updatePasswordVisibility(show) {
    passwordInput.type = show ? "text" : "password";

    const icon = toggleButton.querySelector("i");
    icon.classList.remove("fa-eye", "fa-eye-slash");
    icon.classList.add(show ? "fa-eye-slash" : "fa-eye");
}

toggleButton.addEventListener("click", () => {
    const show = passwordInput.type === "password";
    updatePasswordVisibility(show);
    showCheckbox.checked = show;
});

showCheckbox.addEventListener("change", () => {
    updatePasswordVisibility(showCheckbox.checked);
});

// Login
loginButton.addEventListener("click", login);

passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        login();
    }
});

function login() {

    if (passwordInput.value === correctPassword) {

        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect password.");

        passwordInput.value = "";

        passwordInput.focus();

    }

}
