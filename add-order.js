// ======================================
// Me To You Designs
// Add Order System V2
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
        "MTYD-" + String(lastOrderNumber).padStart(4, "0");

}

// -----------------------------
// TODAY'S DATE
// -----------------------------

function setTodayDate() {

    const today = new Date();

    const formatted =
        today.toISOString().split("T")[0];

    document.getElementById("orderDate").value =
        formatted;

}

// -----------------------------
// UPDATE TOTALS
// -----------------------------

function updateTotals() {

    let total = 0;

    document
        .querySelectorAll(".item-price")
        .forEach(price => {

            total += Number(price.value) || 0;

        });

    document.getElementById("orderTotal").value =
        total.toFixed(2);

    const deposit =
        Number(document.getElementById("depositAmount").value) || 0;

    let balance;

if (document.getElementById("paymentStatus").value === "Paid In Full") {
    balance = 0;
} else {
    balance = total - deposit;
}

    if (balance < 0) {

        balance = 0;

    }

    document.getElementById("remainingBalance").value =
        balance.toFixed(2);

}

// -----------------------------
// PERSONALISATION
// -----------------------------

function setupPersonalisation(item) {

    const select =
        item.querySelector(".item-personalised");

    const box =
        item.querySelector(".personalisation-section");

    select.addEventListener("change", function () {

        if (this.value === "Yes") {

            box.style.display = "block";

        } else {

            box.style.display = "none";

        }

    });

}

// -----------------------------
// PRICE LISTENERS
// -----------------------------

function setupPriceListener(item) {

    const price =
        item.querySelector(".item-price");

    price.addEventListener("input", updateTotals);

}

// -----------------------------
// REMOVE BUTTON
// -----------------------------

function setupRemoveButton(item) {

    const button =
        item.querySelector(".remove-item");

    button.addEventListener("click", function () {

        if (document.querySelectorAll(".item-card").length > 1) {

            item.remove();

            updateTotals();

        }

    });

}
// -----------------------------
// CREATE NEW ITEM
// -----------------------------

function createItem() {

    const item = document.createElement("div");

    item.className = "item-card";

    item.innerHTML = `

<h3>📦 Item</h3>

<label>Product</label>
<input
type="text"
class="item-product"
placeholder="Example: Balloon Arch">

<label>Quantity</label>
<input
type="number"
class="item-quantity"
value="1"
min="1">

<label>Price (£)</label>
<input
type="number"
class="item-price"
value="0"
min="0"
step="0.01">

<label>Size (Optional)</label>
<input
type="text"
class="item-size">

<label>Colour / Theme</label>
<input
type="text"
class="item-colour">

<label>Personalised?</label>

<select class="item-personalised">

<option value="No">No</option>
<option value="Yes">Yes</option>

</select>

<div
class="personalisation-section"
style="display:none;">

<label>Personalisation Details</label>

<textarea
class="item-personalisation"
placeholder="Name, message or wording required..."></textarea>

</div>

<button
type="button"
class="remove-item">

❌ Remove Item

</button>

`;

    setupPersonalisation(item);

    setupPriceListener(item);

    setupRemoveButton(item);

    return item;

}

// -----------------------------
// ADD ANOTHER ITEM
// -----------------------------

const itemsContainer =
    document.getElementById("items");

const addItemButton =
    document.querySelector(".add-item");

addItemButton.addEventListener("click", function () {

    itemsContainer.appendChild(createItem());

});
// -----------------------------
// DELIVERY TRACKING
// -----------------------------

const deliveryMethod =
    document.getElementById("deliveryMethod");

const trackingBox =
    document.getElementById("trackingBox");

function updateDelivery() {

    const trackedMethods = [
        "Royal Mail",
        "Evri",
        "InPost"
    ];

    if (trackedMethods.includes(deliveryMethod.value)) {

        trackingBox.style.display = "block";

    } else {

        trackingBox.style.display = "none";

    }

}

deliveryMethod.addEventListener(
    "change",
    updateDelivery
);

// -----------------------------
// SAVE ORDER
// -----------------------------

document
.querySelector(".save-order")
.addEventListener("click", function () {
const order = {

    orderNumber: "",
    
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

        total:
            document.getElementById("orderTotal").value,

        deposit:
            document.getElementById("depositAmount").value,

        balance:
            document.getElementById("remainingBalance").value,

        paymentStatus:
            document.getElementById("paymentStatus").value,

        paymentMethod:
            document.getElementById("paymentMethod").value,

        deliveryMethod:
            document.getElementById("deliveryMethod").value,

        trackingNumber:
            document.getElementById("trackingNumber").value,

        items: []

    };
let lastOrderNumber =
    Number(localStorage.getItem("lastOrderNumber")) || 0;

lastOrderNumber++;

localStorage.setItem(
    "lastOrderNumber",
    lastOrderNumber
);

order.orderNumber =
    "MTYD-" + String(lastOrderNumber).padStart(4, "0");

document.getElementById("orderNumber").value =
    order.orderNumber;
    document
        .querySelectorAll(".item-card")
        .forEach(item => {

            order.items.push({

                product:
                    item.querySelector(".item-product").value,

                quantity:
                    item.querySelector(".item-quantity").value,

                price:
                    item.querySelector(".item-price").value,

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

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    alert("💗 Order saved successfully!");

});

// -----------------------------
// INITIAL SETUP
// -----------------------------


setTodayDate();

updateTotals();

updateDelivery();

document
.querySelectorAll(".item-card")
.forEach(item => {

    setupPersonalisation(item);

    setupPriceListener(item);

    setupRemoveButton(item);

});

document
.getElementById("depositAmount")
.addEventListener("input", updateTotals);

const paymentStatus = document.getElementById("paymentStatus");

paymentStatus.addEventListener("change", function () {

    const total = Number(document.getElementById("orderTotal").value) || 0;
    const deposit = document.getElementById("depositAmount");

    switch (this.value) {

        case "Not Paid":
            deposit.value = 0;
            break;

        case "Deposit Paid":
            break;

        case "Paid In Full":
            deposit.value = total;
            break;
    }

    updateTotals();

});

const progressSelect = document.getElementById("orderProgress");

const progressSteps = [
    "step-new",
    "step-designing",
    "step-making",
    "step-ready",
    "step-completed"
];

function updateProgressTracker() {

    progressSteps.forEach(id => {
        document.getElementById(id).classList.remove("active");
    });

    const stages = {
        "New Order": 1,
        "Designing": 2,
        "Making": 3,
        "Ready": 4,
        "Completed": 5
    };

    const currentStage = stages[progressSelect.value] || 1;

    for (let i = 0; i < currentStage; i++) {
        document.getElementById(progressSteps[i]).classList.add("active");
    }
}

progressSelect.addEventListener("change", updateProgressTracker);

updateProgressTracker();
const addPaymentButton = document.getElementById("addPaymentButton");
const paymentForm = document.getElementById("paymentForm");

addPaymentButton.addEventListener("click", function () {

    if (paymentForm.style.display === "none") {
        paymentForm.style.display = "block";
    } else {
        paymentForm.style.display = "none";
    }

});
