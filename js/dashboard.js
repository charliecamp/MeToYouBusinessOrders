/* =====================================
   ME TO YOU DESIGNS DASHBOARD
===================================== */

// ------------------------
// Greeting
// ------------------------

const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

if (hour < 12) {
    greeting.textContent = "Good Morning, Charlie 🌸";
} else if (hour < 18) {
    greeting.textContent = "Good Afternoon, Charlie 🌸";
} else {
    greeting.textContent = "Good Evening, Charlie 🌸";
}

// ------------------------
// Date
// ------------------------

const todayDate = document.getElementById("todayDate");

todayDate.textContent = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
});

// ------------------------
// Dashboard Data
// ------------------------

let dashboard = {
    totalOrders: 12,
    pendingOrders: 3,
    completedOrders: 8,
    dueToday: 2
};

function updateDashboard() {

    document.getElementById("totalOrders").textContent = dashboard.totalOrders;
    document.getElementById("pendingOrders").textContent = dashboard.pendingOrders;
    document.getElementById("completedOrders").textContent = dashboard.completedOrders;
    document.getElementById("dueToday").textContent = dashboard.dueToday;

}

updateDashboard();

// ------------------------
// Today's Jobs
// ------------------------

document.querySelectorAll(".task input").forEach(task => {

    task.addEventListener("change", function () {

        if (this.checked) {

            this.parentElement.style.opacity = "0.5";
            this.parentElement.style.textDecoration = "line-through";

        } else {

            this.parentElement.style.opacity = "1";
            this.parentElement.style.textDecoration = "none";

        }

    });

});

// ------------------------
// Hamburger Menu
// ------------------------

const menuButton = document.querySelector(".top-bar .icon-btn");

menuButton.addEventListener("click", function () {

    alert(
`Menu

🏠 Dashboard
📦 Orders
👥 Customers
📅 Calendar
💷 Invoices
⚙️ Settings`
    );

});

// ------------------------
// Bottom Navigation
// ------------------------

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", function (e) {

        const page = this.getAttribute("href");

        if (
            page === "orders.html" ||
            page === "customers.html" ||
            page === "settings.html" ||
            page === "new-order.html"
        ) {

            e.preventDefault();

            alert(page + " hasn't been built yet.");

        }

    });

});

console.log("Dashboard Loaded");
