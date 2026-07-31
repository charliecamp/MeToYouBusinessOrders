// ============================
// VIEW ORDER
// ============================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

const orderIndex =
    Number(localStorage.getItem("viewingOrderIndex"));

const order =
    orders[orderIndex];

if (!order) {

    document.getElementById("orderContainer").innerHTML =
        "<h2>Order not found.</h2>";

}
else {

    document.getElementById("orderContainer").innerHTML = `

<div class="orderCard">

<h2>${order.orderNumber}</h2>

<div class="sectionTitle">
Customer
</div>

<div class="infoRow">
<strong>Name:</strong>
${order.customerName}
</div>

<div class="infoRow">
<strong>Contact:</strong>
${order.customerContact}
</div>

<div class="infoRow">
<strong>Order Source:</strong>
${order.orderSource}
</div>

<div class="infoRow">
<strong>Username:</strong>
${order.socialUsername}
</div>

<div class="sectionTitle">
Due Date
</div>

<div class="infoRow">
${order.dateNeeded}
</div>

<div class="sectionTitle">
Status
</div>

<div class="infoRow">
${order.orderProgress}
</div>

<div class="sectionTitle">
Items Ordered
</div>

${order.items.map(item => `

<div class="infoRow">

<strong>${item.product}</strong><br>

Qty:
${item.quantity}

&nbsp;&nbsp;

£${item.unitPrice}

</div>

`).join("")}

<div class="sectionTitle">
Notes
</div>

<div class="infoRow">
${order.orderNotes}
</div>

<div class="sectionTitle">
Payment
</div>

<div class="infoRow">

Total:
£${order.orderTotal}

<br>

Paid:
£${order.totalPaid}

<br>

Remaining:
£${order.remainingBalance}

</div>

</div>

`;

}

document
.getElementById("editOrderButton")
.addEventListener("click", function () {

    localStorage.setItem(
        "editingOrderIndex",
        orderIndex
    );

    window.location.href =
        "add-order.html";

});
<div class="sectionTitle">
Delivery
</div>

<div class="infoRow">

<strong>Method:</strong>
${order.deliveryMethod}

</div>

<div class="infoRow">

<strong>Tracking:</strong>
${order.trackingNumber || "Not supplied"}

</div>

<div class="sectionTitle">
Payment History
</div>

${order.payments.length === 0
? "<div class='infoRow'>No payments recorded.</div>"
: order.payments.map(payment => `

<div class="infoRow">

${payment.date}

<br>

£${Number(payment.amount).toFixed(2)}

<br>

${payment.method}

</div>

`).join("")
}
<div class="sectionTitle">
Order Notes
</div>

<div class="infoRow">

${order.orderNotes || "No notes added."}

</div>

</div>

`;

}

document
    .getElementById("editOrderButton")
    .addEventListener("click", function () {

        localStorage.setItem(
            "editingOrderIndex",
            orderIndex
        );

        window.location.href =
            "add-order.html";

    });
    
