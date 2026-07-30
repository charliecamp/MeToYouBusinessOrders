/* =====================================
   ME TO YOU DESIGNS DASHBOARD
===================================== */


/* DATE */

const todayDate = document.getElementById("todayDate");

if (todayDate) {

    const today = new Date();

    todayDate.textContent = today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}



/* WELCOME */

const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage) {

    welcomeMessage.textContent = "Welcome Back Charlie";

}



/* SIDE MENU */

const menuButton = document.getElementById("menuButton");

const sideMenu = document.getElementById("sideMenu");

const overlay = document.getElementById("overlay");


if (menuButton) {

    menuButton.addEventListener("click", function(){

        sideMenu.classList.add("active");

        overlay.classList.add("active");

    });

}


if (overlay) {

    overlay.addEventListener("click", function(){

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    });

}



/* CLOSE MENU AFTER SELECTING PAGE */

document.querySelectorAll("#sideMenu a").forEach(function(link){

    link.addEventListener("click", function(){

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    });

});



/* DROPDOWN CARDS */

document.querySelectorAll(".cardHeader").forEach(function(header){

    header.addEventListener("click", function(){

        const content = this.nextElementSibling;

        if(content.style.display === "block"){

            content.style.display = "none";

        } else {

            content.style.display = "block";

        }

    });

});



/* START CLOSED */

document.querySelectorAll(".cardContent").forEach(function(content){

    content.style.display = "none";

});



/* ADD TODAY JOB */

const addJobButton = document.getElementById("addJobButton");

const jobsList = document.getElementById("jobsList");


if(addJobButton){

    addJobButton.addEventListener("click", function(){

        let job = prompt("Add today's job:");

        if(job){

            let li = document.createElement("li");

            li.textContent = "☐ " + job;

            jobsList.appendChild(li);

        }

    });

}



/* ADD DAILY NOTE */

const addNoteButton = document.getElementById("addNoteButton");

const notesList = document.getElementById("notesList");


if(addNoteButton){

    addNoteButton.addEventListener("click", function(){

        let note = prompt("Add daily note:");

        if(note){

            let li = document.createElement("li");

            li.textContent = note;

            notesList.appendChild(li);

        }

    });

}



/* DEMO COUNTERS - WILL CONNECT TO ORDERS LATER */

document.getElementById("totalOrders").textContent = 0;

document.getElementById("pendingOrders").textContent = 0;

document.getElementById("dueWeek").textContent = 0;

document.getElementById("dueMonth").textContent = 0;
