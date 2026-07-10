import {
    APP,
    INCOME_CATEGORIES,
    EXPENSE_CATEGORIES,
    PAYMENT_METHODS
} from "./config.js";

import { createTransaction } from "./models/transaction.js";

import { addTransaction } from "./storage/storage.js";

import { renderTransactions } from "./controllers/transactionController.js";

import {
    getEditingId,
    clearEditingId,
    saveEditedTransaction
} from "./controllers/transactionController.js";

import { showToast } from "./ui/toast.js";

import {
    initializeTheme
} from "./controllers/themeController.js";

import {
    initializeNavigation,
    navigate
} from "./ui/navigation.js";

import {
    showConfirmation
} from "./ui/confirmation.js";

import {
    renderDashboard
} from "./controllers/dashboardController.js";

import { updateDashboardSummary } from "./ui/summary.js";

import { getFilterValues } from "./ui/filters.js";

/* ==========================================
   DOM Elements
========================================== */

const modal = document.getElementById("transactionModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

const resetAppBtn = document.getElementById("reset-app");
const form = document.getElementById("transactionForm");
const themeToggleBtn = document.getElementById("theme-toggle");

const typeSelect = document.getElementById("type");
const categorySelect = document.getElementById("category");
const paymentSelect = document.getElementById("payment");

const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");

/* ==========================================
   Initialization
========================================== */


/* ==========================================
   Event Listeners
========================================== */

openModalBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});

typeSelect.addEventListener("change", () => {

    loadCategories(typeSelect.value);

});

form.addEventListener("submit", handleTransaction);

resetAppBtn.addEventListener("click", resetApplication);

/* ==========================================
   Greeting
========================================== */

function updateGreeting() {

    const greeting = document.getElementById("greeting");
    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour < 12) {

        greeting.textContent = "Good Morning ☀️";

    } else if (hour < 17) {

        greeting.textContent = "Good Afternoon 🌤";

    } else {

        greeting.textContent = "Good Evening 🌙";

    }

}

/* ==========================================
   Current Date
========================================== */

function updateDate() {

    const todayDate = document.getElementById("today-date");
    if (!todayDate) return;

    todayDate.textContent = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}

/* ==========================================
   Default Date
========================================== */

function setTodayDate() {

    dateInput.value = new Date().toISOString().split("T")[0];

}

/* ==========================================
   Categories
========================================== */

function loadCategories(type) {

    categorySelect.innerHTML = "";

    const categories =
        type === "income"
            ? INCOME_CATEGORIES
            : EXPENSE_CATEGORIES;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categorySelect.appendChild(option);

    });

}

/* ==========================================
   Payment Methods
========================================== */

function loadPaymentMethods() {

    paymentSelect.innerHTML = "";

    PAYMENT_METHODS.forEach(method => {

        const option = document.createElement("option");

        option.value = method;

        option.textContent = method;

        paymentSelect.appendChild(option);

    });

}

/* ==========================================
   Modal
========================================== */

function openModal() {

    modal.classList.add("active");
    document.body.classList.add("modal-open");

}

function closeModal() {

    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

}

/* ==========================================
   Transaction Submit
========================================== */

function handleTransaction(event) {

    event.preventDefault();

    const amount = Number(amountInput.value);

    if (!amount) {

      showToast("Please enter an amount.","warning");

        return;

    }

    if (amount <= 0) {

        showToast("Amount must be greater than zero.","warning");

        return;

    }

    if (!dateInput.value) {

        showToast("Please select a date.","warning");

        return;

    }

    const transaction = createTransaction({

        type: typeSelect.value,

        amount,

        category: categorySelect.value,

        paymentMethod: paymentSelect.value,

        date: dateInput.value,

        notes: notesInput.value.trim()

    });

    if (getEditingId()) {

            saveEditedTransaction(transaction);

        } else {

            addTransaction(transaction);

            showToast("Transaction added successfully.");
        }

    renderDashboard();

    resetForm();
    
    clearEditingId();

    closeModal();

}

/* ==========================================
   Reset Form
========================================== */

function resetForm() {

    form.reset();

    typeSelect.value = "expense";

    loadCategories("expense");

    paymentSelect.selectedIndex = 0;

    setTodayDate();

}

export function loadYears(){

    const filterYear = document.getElementById("filter-year");
    if (!filterYear) return;

    const currentYear =
        new Date().getFullYear();

    for(let year=currentYear;
        year>=2020;
        year--){

        const option =
            document.createElement("option");

        option.value = year;

        option.textContent = year;

        filterYear.appendChild(option);

    }

}

/* ==========================================
   Reset Application
========================================== */

function resetApplication() {

    showConfirmation(
        "Are you sure you want to erase all data? This action cannot be undone.",
        () => {
            localStorage.clear();
            renderTransactions();
            showToast(
                "All data has been erased.",
                "success"
            );
        }
    );

}

/* ==========================================
   Dashboard Initialization
========================================== */
/**
 * Initializes the entire application.
 */
function initializeApp() {
    // Initial data and UI updates
    updateGreeting();
    updateDate();
    setTodayDate();
    loadCategories(typeSelect.value);
    loadPaymentMethods();
}

// Global initializations
initializeTheme();
initializeNavigation();
initializeApp();

// Initial page load
navigate("dashboard");