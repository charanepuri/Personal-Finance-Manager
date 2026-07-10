import { loadYears } from "../app.js";
import { renderDashboard as renderDashboardView } from "../views/dashboardView.js";
import { renderReports } from "../views/reportsView.js";
import { renderCalendar } from "../views/calendarView.js";
import { renderBudgets } from "../views/budgetsView.js";
import { renderSettings } from "../views/settingsView.js";
import { renderWishlist } from "../views/wishlistView.js";
import { renderTransactionLog } from "../views/transactionLogView.js";
import { initializeWishlist } from "../controllers/wishlistController.js";
import { initializeCalendar } from "../controllers/calendarController.js";
import { initializeBudgets } from "../controllers/budgetController.js";
import { initializeSettings } from "../controllers/settingsController.js";
import { renderDashboard } from "../controllers/dashboardController.js";
import { renderTransactions } from "../controllers/transactionController.js";

const content = document.getElementById("page-content");

export function initializeNavigation() {

    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const view = link.dataset.view;

            navigate(view);

        });

    });

}

export function navigate(view) {

    document.querySelectorAll(".sidebar nav a").forEach(link => {

        link.classList.remove("active");

    });

    document
        .querySelector(`[data-view="${view}"]`)
        .classList.add("active");

    // Clear header content if not on the dashboard
    if (view !== 'dashboard') {
        clearHeader();
    }

    switch(view){

        case "dashboard":
            renderDashboardView(content);
            renderDashboard(); // Renders transactions and summary
            break;

        case "income":
            renderTransactionLog(content, { title: "Income Log", type: "income" });
            loadYears();
            renderTransactions(); // Render only the transaction list
            document.querySelectorAll(".filters select").forEach(s => s.addEventListener("change", renderTransactions));
            break;

        case "expense":
            renderTransactionLog(content, { title: "Expense Log", type: "expense" });
            loadYears();
            renderTransactions(); // Render only the transaction list
            document.querySelectorAll(".filters select").forEach(s => s.addEventListener("change", renderTransactions));
            break;

        case "reports":
            renderReports(content);
            loadYears(); // Populate the year dropdown
            document.querySelectorAll(".filters select").forEach(s => s.addEventListener("change", renderReports.bind(null, content)));
            break;

        case "calendar":
            renderCalendar(content);
            initializeCalendar();
            break;

        case "budgets":
            renderBudgets(content);
            initializeBudgets();
            break;

        case "wishlist":
            renderWishlist(content);
            initializeWishlist();
            break;

        case "settings":
            renderSettings(content);
            initializeSettings();
            break;

    }

}

function clearHeader() {
    const greeting = document.getElementById("greeting");
    const todayDate = document.getElementById("today-date");
    if (greeting) {
        greeting.textContent = "";
    }
    if (todayDate) {
        todayDate.textContent = "";
    }
}