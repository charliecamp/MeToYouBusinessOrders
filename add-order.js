// =============================
// ADD ORDER SYSTEM
// =============================


// AUTO ORDER NUMBER

let orderNumber = localStorage.getItem("orderCount") || 1;

document.getElementById("orderNumber").value =
"MTYD-" + String(orderNumber).padStart(4,"0");




// =============================
// ADD ANOTHER ITEM
// =============================


const addItemButton = document.getElementById("addItem");
const itemsContainer = document.getElementById("itemsContainer");


addItemButton.addEventListener("click",()=>{


let itemCount = document.querySelectorAll(".item-box").length + 1;


let item = document.createElement("div");

item.className="item-box";


item.innerHTML = `

<h3>
📦 Item ${itemCount}
</h3>


<label>Product</label>
<input type="text">


<label>Quantity</label>
<input type="number" value="1">


<label>Price (£)</label>
<input type="number" value="0">


<label>Size (Optional)</label>
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


});





// REMOVE ITEM


document.addEventListener("click",(e)=>{


if(e.target.classList.contains("remove-item")){


e.target.parentElement.remove();


}


});





// =============================
// PAYMENT CALCULATOR
// =============================


const total = document.getElementById("totalAmount");
const deposit = document.getElementById("depositAmount");
const balance = document.getElementById("remainingBalance");



function updateBalance(){


let totalAmount = Number(total.value);

let depositAmount = Number(deposit.value);


balance.value =
(totalAmount - depositAmount).toFixed(2);


}



total.addEventListener("input",updateBalance);

deposit.addEventListener("input",updateBalance);





// =============================
// DELIVERY TRACKING
// =============================


const delivery = document.getElementById("deliveryMethod");

const tracking = document.getElementById("trackingBox");


delivery.addEventListener("change",()=>{


if(
delivery.value==="Royal Mail" ||
delivery.value==="Evri" ||
delivery.value==="InPost"
)

{

tracking.style.display="block";


}

else

{

tracking.style.display="none";


}


});



tracking.style.display="none";





// =============================
// ORDER PROGRESS
// =============================


const status = document.getElementById("orderStatus");

const progress =
document.getElementById("progressBar");



status.addEventListener("change",()=>{


let value=status.value;


let width="25%";



if(value==="In Progress")
width="50%";


if(value==="Waiting For Customer")
width="55%";


if(value==="Ready")
width="75%";


if(value==="Completed")
width="100%";


if(value==="Cancelled")
width="10%";



progress.style.width=width;


});





// =============================
// SAVE ORDER
// =============================


document.querySelector(".save-order-btn")
.addEventListener("click",()=>{


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let newOrder={


orderNumber:
document.getElementById("orderNumber").value,


customer:
document.getElementById("customerName").value,


contact:
document.getElementById("customerContact").value,


neededDate:
document.getElementById("neededDate").value,


total:
total.value,


balance:
balance.value,


status:
status.value


};



orders.push(newOrder);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



localStorage.setItem(
"orderCount",
Number(orderNumber)+1
);



alert("💖 Order Saved Successfully");



});
