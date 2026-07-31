let orders = [];

const ordersContainer =
    document.getElementById("ordersContainer");

const noOrdersMessage =
    document.getElementById("noOrdersMessage");

const searchInput =
    document.getElementById("searchOrders");

const statusFilter =
    document.getElementById("statusFilter");

const sortOrders =
    document.getElementById("sortOrders");

function loadOrders() {

    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    displayOrders(orders);

}

function displayOrders(orderList) {

    ordersContainer.innerHTML = "";

    if (orderList.length === 0) {

        noOrdersMessage.style.display = "block";

        return;

    }

    noOrdersMessage.style.display = "none";

    orderList.forEach((order, index) => {

        const card =
            document.createElement("div");

        card.className = "order-card";
              const total =
            Number(order.orderTotal || 0);

        const paid =
            Number(order.totalPaid || 0);

        const remaining =
            total - paid;

        card.innerHTML = `

            <h2>

                ${order.orderNumber || "No Order Number"}

            </h2>

            <p>

                <strong>Customer:</strong>
                ${order.customerName || "-"}

            </p>

            <p>

                <strong>Due Date:</strong>
                ${order.dueDate || "-"}

            </p>

            <p>

                <strong>Total:</strong>
                £${total.toFixed(2)}

            </p>

            <p>

                <strong>Paid:</strong>
                £${paid.toFixed(2)}

            </p>

            <p>

                <strong>Remaining:</strong>
                £${remaining.toFixed(2)}

            </p>

            <span class="status-badge">

                ${order.status || "New Order"}

            </span>

            <div class="button-row">

                <button
                    class="edit-btn"
                    onclick="editOrder(${index})">

                    ✏️ Edit

                </button>

                <button
                    class="view-btn"
                    onclick="viewOrder(${index})">

                    👁 View

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteOrder(${index})">

                    🗑 Delete

                </button>

            </div>

        `;

        ordersContainer.appendChild(card);

    });

}
function editOrder(index) {

    localStorage.setItem(
        "editingOrderIndex",
        index
    );

    window.location.href =
        "add-order.html";

}

function viewOrder(index) {

    localStorage.setItem(
        "editingOrderIndex",
        index
    );

    window.location.href =
        "add-order.html";

}

function deleteOrder(index) {

    if (!confirm(
        "Delete this order?"
    )) {

        return;

    }

    orders.splice(index, 1);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders(orders);

}

window.addEventListener(
    "DOMContentLoaded",
    () => {

        loadOrders();

    }
);
