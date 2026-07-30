// ==========================
// ADD ORDER SYSTEM
// Me To You Designs
// ==========================


// Create order number automatically

function createOrderNumber(){

    const orderNumber = "MTYD-" + Math.floor(Math.random() * 9000 + 1000);

    const field = document.getElementById("orderNumber");

    if(field){
        field.value = orderNumber;
    }

}


window.onload = createOrderNumber;





// ==========================
// PAYMENT BALANCE CALCULATOR
// ==========================


function updateBalance(){

    let total = Number(document.getElementById("orderTotal")?.value) || 0;

    let deposit = Number(document.getElementById("depositAmount")?.value) || 0;


    let remaining = total - deposit;


    if(remaining < 0){
        remaining = 0;
    }


    document.getElementById("remainingBalance").value =
    remaining.toFixed(2);

}



document.getElementById("orderTotal")
?.addEventListener("input", updateBalance);


document.getElementById("depositAmount")
?.addEventListener("input", updateBalance);





// ==========================
// ADD ANOTHER ITEM
// ==========================


const addItemButton = document.querySelector(".add-item");

const itemsContainer = document.querySelector("#items");



if(addItemButton){


addItemButton.addEventListener("click", function(){


let item = document.createElement("div");


item.className = "item-box";


item.innerHTML = `

<h3>📦 Item</h3>

<label>Product</label>
<input type="text">


<label>Quantity</label>
<input type="number" value="1">


<label>Price (£)</label>
<input type="number" value="0">


<label>Size</label>
<input type="text">


<label>Colour / Theme</label>
<input type="text">


<label>Personalised?</label>

<select>
<option>No</option>
<option>Yes</option>
</select>


<button class="remove-item">
❌ Remove Item
</button>

`;



itemsContainer.appendChild(item);



item.querySelector(".remove-item")
.addEventListener("click",()=>{

item.remove();

});


});


}
// ==========================
// DELIVERY TRACKING SYSTEM
// ==========================


const deliverySelect = document.getElementById("deliveryMethod");

const trackingBox = document.getElementById("trackingBox");


if(deliverySelect){


deliverySelect.addEventListener("change", function(){


if(
this.value === "Royal Mail" ||
this.value === "Evri" ||
this.value === "InPost"
){


trackingBox.style.display = "block";


}

else{


trackingBox.style.display = "none";


}


});


}
// ==========================

// ==========================
// SAVE ORDER SYSTEM
// ==========================


const saveOrderButton = document.querySelector(".save-order");


if(saveOrderButton){


saveOrderButton.addEventListener("click", function(){


const order = {


orderNumber:
document.getElementById("orderNumber")?.value,


customerName:
document.querySelector("#customerName")?.value,


customerContact:
document.querySelector("#customerContact")?.value,


orderedFrom:
document.querySelector("#orderSource")?.value,


socialUsername:
document.querySelector("#socialUsername")?.value,


orderNotes:
document.querySelector("#orderNotes")?.value,


total:
document.querySelector("#orderTotal")?.value,


deposit:
document.querySelector("#depositAmount")?.value,


balance:
document.querySelector("#remainingBalance")?.value,


delivery:
document.querySelector("#deliveryMethod")?.value,

items:
Array.from(document.querySelectorAll(".item-box")).map(item => ({
    product: item.querySelector("#product")?.value,
    quantity: item.querySelector("#quantity")?.value,
    price: item.querySelector("#price")?.value,
    size: item.querySelector("#size")?.value,
    colour: item.querySelector("#colour")?.value
})),

paymentMethod:
document.querySelector("#paymentMethod")?.value,

tracking:
document.querySelector("#trackingNumber")?.value,


status:
"New Order",


created:
new Date().toLocaleDateString()


};



// Save order

localStorage.setItem(
"latestOrder",
JSON.stringify(order)
);



alert("✨ Order Saved Successfully!");



});


}
