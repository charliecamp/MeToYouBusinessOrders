/* =====================================
   ME TO YOU DESIGNS DASHBOARD JS
===================================== */


/* DATE */

const todayDate = document.getElementById("todayDate");

if(todayDate){

    const today = new Date();

    todayDate.textContent = today.toLocaleDateString("en-GB", {

        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"

    });

}


/* WELCOME MESSAGE */

const welcomeMessage = document.getElementById("welcomeMessage");

if(welcomeMessage){

    welcomeMessage.textContent = "Welcome Back Charlie";

}



/* SIDE MENU */

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");


if(menuButton){

    menuButton.addEventListener("click",()=>{

        sideMenu.classList.add("active");

        overlay.classList.add("active");

    });

}


if(overlay){

    overlay.addEventListener("click",()=>{

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    });

}



/* CLOSE MENU WHEN CLICKING A LINK */

const menuLinks = document.querySelectorAll("#sideMenu a");


menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    });

});



/* DROPDOWN OPEN/CLOSE */

const cards = document.querySelectorAll(".cardHeader");


cards.forEach(header=>{


    header.addEventListener("click",()=>{


        const content = header.nextElementSibling;


        if(content.style.display === "block"){

            content.style.display="none";

        }

        else{

            content.style.display="block";

        }


    });


});



/* START DROPDOWNS CLOSED */

document.querySelectorAll(".cardContent").forEach(content=>{

    content.style.display="none";

});



/* ADD TODAY'S JOB */

const addJobButton = document.getElementById("addJobButton");

const jobsList = document.getElementById("jobsList");


if(addJobButton){


addJobButton.addEventListener("click",()=>{


    let job = prompt("Add today's job");


    if(job){


        let li=document.createElement("li");

        li.textContent="☐ " + job;


        jobsList.appendChild(li);


    }


});


}




/* ADD DAILY NOTE */


const addNoteButton = document.getElementById("addNoteButton");

const notesList = document.getElementById("notesList");


if(addNoteButton){


addNoteButton.addEventListener("click",()=>{


    let note = prompt("Add daily note");


    if(note){


        let li=document.createElement("li");

        li.textContent=note;


        notesList.appendChild(li);


    }


});


}
