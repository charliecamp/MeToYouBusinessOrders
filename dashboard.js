/* =================================
   ME TO YOU DESIGNS DASHBOARD
================================= */


/* DATE */

const todayDate = document.getElementById("todayDate");

const date = new Date();

todayDate.textContent = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});


/* WELCOME MESSAGE */

const welcome = document.getElementById("welcomeMessage");

const hour = new Date().getHours();

if(hour < 12){

    welcome.textContent = "Good Morning Charlie 👋";

}

else if(hour < 18){

    welcome.textContent = "Good Afternoon Charlie 👋";

}

else{

    welcome.textContent = "Good Evening Charlie 👋";

}



/* SIDE MENU */

const menuButton = document.getElementById("menuButton");

const sideMenu = document.getElementById("sideMenu");

const overlay = document.getElementById("overlay");


menuButton.addEventListener("click",()=>{

    sideMenu.classList.add("active");

    overlay.classList.add("active");

});


overlay.addEventListener("click",()=>{

    sideMenu.classList.remove("active");

    overlay.classList.remove("active");

});



/* CLOSE MENU WHEN PAGE CHOSEN */

document.querySelectorAll("#sideMenu a").forEach(link=>{

    link.addEventListener("click",()=>{

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    });

});



/* DROPDOWN SECTIONS */

const dropdowns = document.querySelectorAll(".cardHeader");


dropdowns.forEach(card=>{

    card.addEventListener("click",()=>{

        const content = card.nextElementSibling;


        if(content.style.display === "block"){

            content.style.display="none";

        }

        else{

            content.style.display="block";

        }

    });

});



/* START CLOSED */

document.querySelectorAll(".cardContent").forEach(section=>{

    section.style.display="none";

});



/* ADD JOB */

const addJob = document.getElementById("addJobButton");

const jobsList = document.getElementById("jobsList");


if(addJob){

addJob.addEventListener("click",()=>{


    let job = prompt("Add today's job");


    if(job){


        let item=document.createElement("li");

        item.textContent="☐ " + job;


        jobsList.appendChild(item);


    }


});

}



/* ADD NOTE */

const addNote = document.getElementById("addNoteButton");

const notesList = document.getElementById("notesList");


if(addNote){

addNote.addEventListener("click",()=>{


    let note = prompt("Add daily note");


    if(note){


        let item=document.createElement("li");

        item.textContent=note;


        notesList.appendChild(item);


    }


});

}
