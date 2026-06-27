import { getTransactions } from "../storage/storage.js";
import { APP } from "../config.js";

let currentDate = new Date();

/**
 * Initializes the calendar functionality, including rendering and event listeners.
 */
export function initializeCalendar() {
    renderCalendar();
    attachNavigationEvents();
}

/**
 * Renders the calendar grid for the current month.
 */
function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    const title = document.getElementById("month-title");
    const dayTransactionsContainer = document.getElementById("day-transactions");

    if (!grid || !title) return;

    grid.innerHTML = "";
    dayTransactionsContainer.innerHTML = "<h3>Select a day to view transactions.</h3>";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    title.textContent = currentDate.toLocaleDateString(APP.DATE_LOCALE, {
        month: "long",
        year: "numeric",
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const transactionsForMonth = getTransactions().filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() === year && transactionDate.getMonth() === month;
    });

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
        grid.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const hasTransactions = transactionsForMonth.some(t => t.date === dateStr);

        grid.insertAdjacentHTML("beforeend", `
            <div class="day" data-date="${dateStr}">
                <span class="day-number">${day}</span>
                ${hasTransactions ? '<div class="transaction-dot"></div>' : ''}
            </div>
        `);
    }

    attachDayClickEvents();
}

/**
 * Attaches click event listeners to the previous and next month buttons.
 */
function attachNavigationEvents() {
    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

/**
 * Attaches click event listeners to each day in the calendar grid.
 */
function attachDayClickEvents() {
    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", (e) => {
            const date = e.currentTarget.dataset.date;
            showTransactionsForDay(date);
        });
    });
}

/**
 * Displays the transactions for a specific day.
 * @param {string} date - The date string in 'YYYY-MM-DD' format.
 */
function showTransactionsForDay(date) {
    const container = document.getElementById("day-transactions");
    const transactions = getTransactions().filter(t => t.date === date);

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(APP.DATE_LOCALE, {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    let content = `<h3>Transactions for ${formattedDate}</h3>`;

    if (transactions.length === 0) {
        content += "<p>No transactions on this day.</p>";
    } else {
        content += transactions.map(transaction => {
            const amountClass = transaction.type === "income" ? "income-text" : "expense-text";
            const sign = transaction.type === "income" ? "+" : "-";
            return `
                <div class="transaction-card-mini">
                    <div class="transaction-info">
                        <strong>${transaction.category}</strong>
                        <small>${transaction.paymentMethod}</small>
                    </div>
                    <div class="transaction-amount ${amountClass}">
                        ${sign} ${APP.CURRENCY}${transaction.amount.toLocaleString('en-IN')}
                    </div>
                </div>
            `;
        }).join("");
    }

    container.innerHTML = content;
}