// ======================================
// Me To You Designs
// Add Order System V3
// ======================================



// -----------------------------
// ORDER NUMBER
// -----------------------------

function createOrderNumber() {

    let lastOrderNumber =
        Number(localStorage.getItem("lastOrderNumber")) || 0;

    lastOrderNumber++;

    localStorage.setItem(
        "lastOrderNumber",
        lastOrderNumber
    );

    document.getElementById("orderNumber").value =
        "MTYD-" +
        String(lastOrderNumber).padStart(4, "0");

}



// -----------------------------
// TODAY'S DATE
// -----------------------------

function setTodayDate() {

    const today = new Date();

    document.getElementById("orderDate").value =
        today.toISOString().split("T")[0];

}



// -----------------------------
// UPDATE ITEM TOTALS
// -----------------------------

function updateTotals() {

    let grandTotal = 0;

    document
        .querySelectorAll(".item-card")
        .forEach(item => {

            const quantity =
                Number(
                    item.querySelector(".item-quantity").value
                ) || 0;

            const unitPrice =
                Number(
                    item.querySelector(".item-price").value
                ) || 0;

            const itemTotal =
                quantity * unitPrice;

            item.querySelector(".item-total").value =
                itemTotal.toFixed(2);

            grandTotal += itemTotal;

        });

    document.getElementById("orderTotal").value =
        grandTotal.toFixed(2);

    updatePaymentSummary();

}



// -----------------------------
// PAYMENT SUMMARY
// -----------------------------

function updatePaymentSummary() {

    const total =
        Number(document.getElementById("orderTotal").value) || 0;

    const paid =
        Number(document.getElementById("totalPaid").value) || 0;

    let remaining =
        total - paid;

    if (remaining < 0) {

        remaining = 0;

    }

    document.getElementById("remainingBalance").value =
        remaining.toFixed(2);

    const status =
        document.getElementById("paymentStatus");

    if (paid <= 0) {

        status.value = "Not Paid";

    }

    else if (remaining <= 0) {

        status.value = "Paid In Full";

    }

    else {

        status.value = "Part Paid";

    }

}



// -----------------------------
// PERSONALISATION
// -----------------------------

function setupPersonalisation(item) {

    const select =
        item.querySelector(".item-personalised");

    const section =
        item.querySelector(".personalisation-section");

    select.addEventListener("change", function () {

        if (this.value === "Yes") {

            section.style.display = "block";

        }

        else {

            section.style.display = "none";

        }

    });

}
// -----------------------------
// ITEM EVENTS
// -----------------------------

function setupItemEvents(item) {

    item
        .querySelector(".item-quantity")
        .addEventListener("input", updateTotals);

    item
        .querySelector(".item-price")
        .addEventListener("input", updateTotals);

    setupPersonalisation(item);

    item
        .querySelector(".remove-item")
        .addEventListener("click", function () {

            const cards =
                document.querySelectorAll(".item-card");

            if (cards.length === 1) {

                alert("At least one item is required.");

                return;

            }

            item.remove();

            updateTotals();

        });

}



// -----------------------------
// CREATE NEW ITEM
// -----------------------------

function createItemCard() {

    const firstCard =
        document.querySelector(".item-card");

    const newCard =
        firstCard.cloneNode(true);

    newCard.querySelector(".item-product").value = "";

    newCard.querySelector(".item-quantity").value = 1;

    newCard.querySelector(".item-price").value = 0;

    newCard.querySelector(".item-total").value = 0;

    newCard.querySelector(".item-size").value = "";

    newCard.querySelector(".item-colour").value = "";

    newCard.querySelector(".item-personalised").value = "No";

    newCard.querySelector(".item-personalisation").value = "";

    newCard.querySelector(".personalisation-section").style.display = "none";

    setupItemEvents(newCard);

    return newCard;

}



// -----------------------------
// ADD ITEM BUTTON
// -----------------------------

function setupAddItemButton() {

    document
        .querySelector(".add-item")
        .addEventListener("click", function () {

            const container =
                document.getElementById("items");

            container.appendChild(createItemCard());

            updateTotals();

        });

}



// -----------------------------
// INITIALISE FIRST ITEM
// -----------------------------

function initialiseItems() {

    document
        .querySelectorAll(".item-card")
        .forEach(item => {

            setupItemEvents(item);

        });

    setupAddItemButton();

    updateTotals();

}
// -----------------------------
// PAYMENTS
// -----------------------------

let payments = [];
let editingOrderIndex = null;


// -----------------------------
// SHOW / HIDE PAYMENT FORM
// -----------------------------

function setupPaymentButton() {

    document
        .getElementById("addPaymentButton")
        .addEventListener("click", function () {

            const form =
                document.getElementById("paymentForm");

            if (form.style.display === "none") {

                form.style.display = "block";

            }

            else {

                form.style.display = "none";

            }

        });

}



// -----------------------------
// RENDER PAYMENT HISTORY
// -----------------------------

function renderPaymentHistory() {

    const history =
        document.getElementById("paymentHistory");

    if (payments.length === 0) {

        history.innerHTML =
            "<p>No payments recorded yet.</p>";

        document.getElementById("totalPaid").value = "0.00";

        updatePaymentSummary();

        return;

    }

    history.innerHTML = "";

    let totalPaid = 0;

    payments.forEach(function(payment, index) {

        totalPaid += Number(payment.amount);

        const card =
            document.createElement("div");

        card.className = "payment-card";

        card.innerHTML = `

<strong>£${Number(payment.amount).toFixed(2)}</strong><br>

${payment.date}<br>

${payment.method}<br>

${payment.notes || ""}

<br><br>

<button
type="button"
class="delete-payment"
data-index="${index}">

❌ Delete

</button>

`;

        history.appendChild(card);

    });

    document.getElementById("totalPaid").value =
        totalPaid.toFixed(2);

    updatePaymentSummary();

    setupDeletePayments();

}



// -----------------------------
// SAVE PAYMENT
// -----------------------------

function savePayment() {

    const amount =
        Number(document.getElementById("paymentAmount").value);

    if (amount <= 0) {

        alert("Enter a payment amount.");

        return;

    }

    payments.push({

        date:
            document.getElementById("paymentDate").value,

        amount: amount,

        method:
            document.getElementById("paymentMethodEntry").value,

        notes:
            document.getElementById("paymentNotes").value

    });

    document.getElementById("paymentDate").value = "";

    document.getElementById("paymentAmount").value = "";

    document.getElementById("paymentNotes").value = "";

    document.getElementById("paymentForm").style.display =
        "none";

    renderPaymentHistory();

}
// -----------------------------
// DELETE PAYMENTS
// -----------------------------

function setupDeletePayments() {

    document
        .querySelectorAll(".delete-payment")
        .forEach(button => {

            button.addEventListener("click", function () {

                const index =
                    Number(this.dataset.index);

                payments.splice(index, 1);

                renderPaymentHistory();

            });

        });

}



// -----------------------------
// DELIVERY
// -----------------------------

function setupDelivery() {

    const delivery =
        document.getElementById("deliveryMethod");

    const tracking =
        document.getElementById("trackingBox");

    function updateTracking() {

        const value = delivery.value;

        if (
            value === "Royal Mail" ||
            value === "Evri" ||
            value === "InPost"
        ) {

            tracking.style.display = "block";

        }

        else {

            tracking.style.display = "none";

        }

    }

    delivery.addEventListener(
        "change",
        updateTracking
    );

    updateTracking();

}



// -----------------------------
// ORDER PROGRESS
// -----------------------------

function setupProgressTracker() {

    const progress =
        document.getElementById("orderProgress");

    const steps = {

        "New Order": "step-new",

        "Designing": "step-designing",

        "Making": "step-making",

        "Ready": "step-ready",

        "Completed": "step-completed"

    };

    function updateTracker() {

        document
            .querySelectorAll(".progress-step")
            .forEach(step => {

                step.classList.remove("active");

            });

        document
            .getElementById(
                steps[progress.value]
            )
            .classList.add("active");

    }

    progress.addEventListener(
        "change",
        updateTracker
    );

    updateTracker();

}

// -----------------------------
// LOAD ORDER
// -----------------------------

function loadOrder(index) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const order = orders[index];

    if (!order) {

        return;

    }

    editingOrderIndex = index;

    document.getElementById("customerName").value =
        order.customerName || "";

    document.getElementById("customerContact").value =
        order.customerContact || "";

    document.getElementById("orderSource").value =
        order.orderSource || "Facebook";

    document.getElementById("socialUsername").value =
        order.socialUsername || "";

    document.getElementById("orderDate").value =
        order.orderDate || "";

    document.getElementById("dateNeeded").value =
        order.dateNeeded || "";

    document.getElementById("orderNotes").value =
        order.orderNotes || "";

    document.getElementById("deliveryMethod").value =
        order.deliveryMethod || "Collection";

    document.getElementById("trackingNumber").value =
        order.trackingNumber || "";

    document.getElementById("orderProgress").value =
        order.orderProgress || "New Order";

    document.getElementById("orderNumber").value =
        order.orderNumber || "";

payments = order.payments || [];

const itemsContainer =
    document.getElementById("items");

itemsContainer.innerHTML = "";

(order.items || []).forEach(savedItem => {

    const item =
        createItemCard();

    item.querySelector(".item-product").value =
        savedItem.product || "";

    item.querySelector(".item-quantity").value =
        savedItem.quantity || 1;

    item.querySelector(".item-price").value =
        savedItem.unitPrice || 0;

    item.querySelector(".item-total").value =
        savedItem.itemTotal || 0;

    item.querySelector(".item-size").value =
        savedItem.size || "";

    item.querySelector(".item-colour").value =
        savedItem.colour || "";

    item.querySelector(".item-personalised").value =
        savedItem.personalised || "No";

    item.querySelector(".item-personalisation").value =
        savedItem.personalisation || "";

    if (savedItem.personalised === "Yes") {

        item.querySelector(
            ".personalisation-section"
        ).style.display = "block";

    }

    itemsContainer.appendChild(item);

});

updateTotals();

renderPaymentHistory();

}

// -----------------------------
// SAVE ORDER
// -----------------------------

function saveOrder() {

    const items = [];

    document
        .querySelectorAll(".item-card")
        .forEach(item => {

            items.push({

                product:
                    item.querySelector(".item-product").value,

                quantity:
                    Number(item.querySelector(".item-quantity").value),

                unitPrice:
                    Number(item.querySelector(".item-price").value),

                itemTotal:
                    Number(item.querySelector(".item-total").value),

                size:
                    item.querySelector(".item-size").value,

                colour:
                    item.querySelector(".item-colour").value,

                personalised:
                    item.querySelector(".item-personalised").value,

                personalisation:
                    item.querySelector(".item-personalisation").value

            });

        });

    const order = {

        orderNumber:
            document.getElementById("orderNumber").value,

        customerName:
            document.getElementById("customerName").value,

        customerContact:
            document.getElementById("customerContact").value,

        orderSource:
            document.getElementById("orderSource").value,

        socialUsername:
            document.getElementById("socialUsername").value,

        orderDate:
            document.getElementById("orderDate").value,

        dateNeeded:
            document.getElementById("dateNeeded").value,

        orderNotes:
            document.getElementById("orderNotes").value,

        deliveryMethod:
            document.getElementById("deliveryMethod").value,

        trackingNumber:
            document.getElementById("trackingNumber").value,

        orderProgress:
            document.getElementById("orderProgress").value,

        orderTotal:
            Number(document.getElementById("orderTotal").value),

        totalPaid:
            Number(document.getElementById("totalPaid").value),

        remainingBalance:
            Number(document.getElementById("remainingBalance").value),

        paymentStatus:
            document.getElementById("paymentStatus").value,

        payments: payments,

        items: items

    };

    const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

if (editingOrderIndex !== null) {

    orders[editingOrderIndex] = order;

}

else {

    orders.push(order);

}

localStorage.setItem(
    "orders",
    JSON.stringify(orders)
);

alert("✅ Order saved successfully!");
}



// -----------------------------
// SAVE BUTTON
// -----------------------------

function setupSaveButton() {

    document
        .querySelector(".save-order")
        .addEventListener("click", saveOrder);

}



// -----------------------------
// SAVE PAYMENT BUTTON
// -----------------------------

function setupSavePaymentButton() {

    document
        .getElementById("savePayment")
        .addEventListener("click", savePayment);

}
// -----------------------------
// PAGE STARTUP
// -----------------------------

document.addEventListener("DOMContentLoaded", function () {

    initialiseItems();

    setupPaymentButton();

    setupSavePaymentButton();

    setupDelivery();

    setupProgressTracker();

    setupSaveButton();

    const editIndex =
        localStorage.getItem("editingOrderIndex");

    if (editIndex !== null) {

        loadOrder(Number(editIndex));

        localStorage.removeItem("editingOrderIndex");

    }

    else {

        createOrderNumber();

        setTodayDate();

        renderPaymentHistory();

    }

});
