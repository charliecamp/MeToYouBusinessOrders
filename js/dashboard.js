// ----------------------------
// Today's Date
// ----------------------------

const todayDate = document.getElementById("todayDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// ----------------------------
// Side Menu
// ----------------------------

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuButton.addEventListener("click", () => {

    sideMenu.classList.add("active");
    overlay.classList.add("active");

});

overlay.addEventListener("click", () => {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

});

// ----------------------------
// Close menu when link clicked
// ----------------------------

document.querySelectorAll("#sideMenu a").forEach(link => {

    link.addEventListener("click", () => {

        sideMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

});

// ----------------------------
// Quick Action Buttons
// ----------------------------

document.getElementById("ordersBtn").onclick = () => {

    window.location.href = "orders.html";

};

document.getElementById("customersBtn").onclick = () => {

    window.location.href = "customers.html";

};

document.getElementById("addOrderBtn").onclick = () => {

    window.location.href = "orders.html";

};

// ----------------------------
// Demo Dashboard Data
// ----------------------------

document.getElementById("todayOrders").textContent = "0";
document.getElementById("ordersDue").textContent = "0";
document.getElementById("outstandingPayments").textContent = "£0.00";
document.getElementById("monthlyRevenue").textContent = "£0.00";
