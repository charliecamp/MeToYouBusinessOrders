const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {

    sideMenu.classList.add("active");
    overlay.classList.add("active");

});

overlay.addEventListener("click", closeMenu);

function closeMenu() {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

}

let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

const ordersContainer =
    document.getElementById("ordersContainer");

displayOrders();

function displayOrders() {

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML = `

<section class="dashboardCard">

<div class="cardContent">

<p style="text-align:center;">

No orders yet.

</p>

</div>

</section>

`;

        return;

    }

    orders.forEach((order, index) => {

        const total =
            Number(order.orderTotal || 0);

        const paid =
            Number(order.totalPaid || 0);

        const remaining =
            total - paid;

        ordersContainer.innerHTML += `

<section class="dashboardCard">

<div class="cardHeader">

📦 ${order.orderNumber || "Order"}

</div>

<div class="cardContent">

<p><strong>${order.customerName || ""}</strong></p>

<p>📅 ${order.dueDate || "-"}</p>

<p>🛠 ${order.status || "New Order"}</p>

<p>💷 Remaining £${remaining.toFixed(2)}</p>

<br>

<button
class="addButton"
onclick="editOrder(${index})">

✏️ Edit Order

</button>

</div>

</section>

`;

    });

}

function editOrder(index){

    localStorage.setItem(
        "editingOrderIndex",
        index
    );

    window.location.href =
        "add-order.html";

}
