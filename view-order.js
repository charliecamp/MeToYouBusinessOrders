// ======================================
// Me To You Designs
// View Order
// ======================================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

const viewingOrderIndex =
    Number(localStorage.getItem("viewingOrderIndex"));

const order =
    orders[viewingOrderIndex];

if (!order) {

    document.getElementById("orderContainer").innerHTML =
        "<h2>Order not found.</h2>";

}
else {

    document.getElementById("orderNumber").textContent =
        order.orderNumber;

    document.getElementById("customerNameHeader").textContent =
        order.customerName;

    document.getElementById("dueDateBadge").textContent =
        "📅 Due: " + (order.dateNeeded || "-");

    document.getElementById("statusBadge").textContent =
        "🛠️ " + (order.orderProgress || "New Order");

    document.getElementById("customerDetails").innerHTML = `

<p><strong>Name:</strong> ${order.customerName}</p>

<p><strong>Contact:</strong> ${order.customerContact}</p>

<p><strong>Order Source:</strong> ${order.orderSource}</p>

<p><strong>Username:</strong> ${order.socialUsername || "-"}</p>

<p><strong>Order Date:</strong> ${order.orderDate}</p>

`;

    let itemsHTML = "";

    order.items.forEach(item => {

        itemsHTML += `

<div class="itemCard">

<strong>${item.product}</strong>

<p>Quantity: ${item.quantity}</p>

<p>Unit Price: £${Number(item.unitPrice).toFixed(2)}</p>

<p>Total: £${Number(item.itemTotal).toFixed(2)}</p>

<p>Size: ${item.size || "-"}</p>

<p>Colour: ${item.colour || "-"}</p>

<p>Personalised: ${item.personalised}</p>

<p>${item.personalisation || ""}</p>

</div>

`;

    });

    document.getElementById("itemsOrdered").innerHTML =
        itemsHTML;
      document.getElementById("paymentSummary").innerHTML = `

<p><strong>Order Total:</strong> £${Number(order.orderTotal).toFixed(2)}</p>

<p><strong>Total Paid:</strong> £${Number(order.totalPaid).toFixed(2)}</p>

<p><strong>Remaining Balance:</strong> £${Number(order.remainingBalance).toFixed(2)}</p>

<p><strong>Status:</strong> ${order.paymentStatus}</p>

`;

    let paymentHTML = "";

    if (!order.payments || order.payments.length === 0) {

        paymentHTML = `

<p>No payments recorded.</p>

`;

    }

    else {

        order.payments.forEach(payment => {

            paymentHTML += `

<div class="paymentCard">

<strong>£${Number(payment.amount).toFixed(2)}</strong>

<p>Date: ${payment.date}</p>

<p>Method: ${payment.method}</p>

<p>${payment.notes || ""}</p>

</div>

`;

        });

    }

    document.getElementById("paymentHistory").innerHTML =
        paymentHTML;

    document.getElementById("deliveryDetails").innerHTML = `

<p><strong>Delivery Method:</strong> ${order.deliveryMethod}</p>

<p><strong>Tracking Number:</strong> ${order.trackingNumber || "Not supplied"}</p>

`;

    document.getElementById("orderNotes").innerHTML = `

<p>${order.orderNotes || "No notes added."}</p>

`;
    document
        .getElementById("editOrderButton")
        .addEventListener("click", function () {

            localStorage.setItem(
                "editingOrderIndex",
                viewingOrderIndex
            );

            window.location.href =
                "add-order.html";

        });

}
