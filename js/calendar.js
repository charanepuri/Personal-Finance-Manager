import { getTransactions } from "./storage/storage.js";

const grid =
document.getElementById("calendar-grid");

const title =
document.getElementById("month-title");

let current =
new Date();

renderCalendar();

function renderCalendar(){

    grid.innerHTML="";

    const year=current.getFullYear();

    const month=current.getMonth();

    title.textContent=current.toLocaleDateString(

        "en-IN",

        {

            month:"long",

            year:"numeric"

        }

    );

    const firstDay=
        new Date(year,month,1).getDay();

    const totalDays=
        new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        grid.innerHTML+=`<div></div>`;

    }

    for(let day=1;day<=totalDays;day++){

        const date=

        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        const transactions=

            getTransactions().filter(

                transaction=>transaction.date===date

            );

        grid.innerHTML+=`

        <div

            class="day"

            data-date="${date}">

            <div class="day-number">

                ${day}

            </div>

            <div class="transaction-count">

                ${transactions.length || ""}

            </div>

        </div>

        `;

    }

    attachEvents();

}


function attachEvents(){

    document

    .querySelectorAll(".day")

    .forEach(day=>{

        day.addEventListener("click",()=>{

            const date=

            day.dataset.date;

            showTransactions(date);

        });

    });

}

function showTransactions(date){

    const container=

    document.getElementById(

        "day-transactions"

    );

    const transactions=

    getTransactions().filter(

        transaction=>transaction.date===date

    );

    if(!transactions.length){

        container.innerHTML=

        "<h3>No Transactions</h3>";

        return;

    }

    container.innerHTML=

    transactions.map(transaction=>`

    <div class="transaction-card">

        <h3>

            ${transaction.category}

        </h3>

        <p>

            ₹${transaction.amount}

        </p>

        <small>

            ${transaction.notes}

        </small>

    </div>

    `).join("");

}


document

.getElementById("prev-month")

.onclick=()=>{

    current.setMonth(

        current.getMonth()-1

    );

    renderCalendar();

};

document

.getElementById("next-month")

.onclick=()=>{

    current.setMonth(

        current.getMonth()+1

    );

    renderCalendar();

};