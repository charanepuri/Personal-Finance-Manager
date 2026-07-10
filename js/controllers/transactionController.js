import {
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../storage/storage.js";

import { getFilteredTransactions } from "../services/transactionService.js";

import { getFilterValues } from "../ui/filters.js";

import { renderCharts } from "../charts/charts.js";

import { showToast } from "../ui/toast.js";

import {
    showConfirmation
} from "../ui/confirmation.js";


let editingId = null;

export function getEditingId() {
    return editingId;
}

export function clearEditingId() {
    editingId = null;
}

export function startEditing(id) {

    const transaction = getTransactionById(id);

    if (!transaction) return;

    editingId = id;

    document.getElementById("type").value = transaction.type;

    document.getElementById("amount").value = transaction.amount;

    document.getElementById("date").value = transaction.date;

    document.getElementById("notes").value = transaction.notes;

    document.getElementById("payment").value = transaction.paymentMethod;

    const typeSelect = document.getElementById("type");

    typeSelect.dispatchEvent(new Event("change"));

    document.getElementById("category").value =
        transaction.category;

    document.querySelector(".save-btn").textContent =
        "Update Transaction";

}

export function saveEditedTransaction(transaction) {

    transaction.id = editingId;

    updateTransaction(transaction);

    editingId = null;

    document.querySelector(".save-btn").textContent =
        "Save Transaction";

}

const categoryIcons = {
    // Expenses
    "Food": { icon: "fa-utensils", color: "#F59E0B" },
    "Groceries": { icon: "fa-shopping-cart", color: "#10B981" },
    "Travel": { icon: "fa-plane", color: "#3B82F6" },
    "Shopping": { icon: "fa-tshirt", color: "#8B5CF6" },
    "Bills": { icon: "fa-file-invoice-dollar", color: "#6366F1" },
    "Rent": { icon: "fa-home", color: "#EF4444" },
    "EMI": { icon: "fa-credit-card", color: "#D946EF" },
    "Fuel": { icon: "fa-gas-pump", color: "#475569" },
    "Healthcare": { icon: "fa-briefcase-medical", color: "#EC4899" },
    "Medicine": { icon: "fa-pills", color: "#EC4899" },
    "Education": { icon: "fa-user-graduate", color: "#0EA5E9" },
    "Entertainment": { icon: "fa-film", color: "#F43F5E" },
    "Subscriptions": { icon: "fa-rss", color: "#64748B" },
    "Insurance": { icon: "fa-shield-alt", color: "#06B6D4" },
    "Personal Care": { icon: "fa-spa", color: "#F472B6" },
    "Clothing": { icon: "fa-tshirt", color: "#8B5CF6" },
    "Electronics": { icon: "fa-laptop", color: "#14B8A6" },
    "Home": { icon: "fa-couch", color: "#A855F7" },
    "Taxes": { icon: "fa-hand-holding-dollar", color: "#78716C" },
    "Charity": { icon: "fa-hand-holding-heart", color: "#F97316" },

    // Incomes
    "Salary": { icon: "fa-briefcase", color: "#16A34A" },
    "Freelance": { icon: "fa-laptop-code", color: "#16A34A" },
    "Business": { icon: "fa-store", color: "#16A34A" },
    "Bonus": { icon: "fa-gift", color: "#16A34A" },
    "Commission": { icon: "fa-percent", color: "#16A34A" },
    "Investment": { icon: "fa-chart-line", color: "#16A34A" },
    "Interest": { icon: "fa-hand-holding-dollar", color: "#16A34A" },
    "Rental Income": { icon: "fa-house-user", color: "#16A34A" },
    "Cashback": { icon: "fa-undo", color: "#16A34A" },
    "Refund": { icon: "fa-money-bill-transfer", color: "#16A34A" },
    "Gift": { icon: "fa-gift", color: "#16A34A" },
    "Catering Payment": { icon: "fa-utensils", color: "#16A34A" },

    // Default
    "Other": { icon: "fa-question-circle", color: "#6B7280" },
    "Default": { icon: "fa-wallet", color: "#4F46E5" }
};

export function getCategoryStyle(category, type) {
    if (type === 'income' && !categoryIcons[category]) {
        return { icon: 'fa-arrow-down', color: '#22C55E' };
    }
    const style = categoryIcons[category] || categoryIcons['Other'];
    return style;
}

export function renderTransactions(){

    const container =
        document.getElementById("transaction-list");

    const filters = getFilterValues();
    const transactions = getFilteredTransactions(filters);

    if(transactions.length===0){

        container.innerHTML=`

        <div class="transaction-card">

            <div class="transaction-info">

                <h3>No Transactions Yet</h3>

                <p>Add your first transaction.</p>

            </div>

        </div>

        `;
        renderCharts(filters);
        return;

    }

    let transactionsHTML = "";

    transactions.forEach(transaction => {

        const amountClass =
            transaction.type==="income"
            ? "income-text"
            : "expense-text";

        const sign =
            transaction.type==="income"
            ? "+"
            : "-";

        const categoryStyle = getCategoryStyle(transaction.category, transaction.type);
        const iconClass = `fa-solid ${categoryStyle.icon}`;

        transactionsHTML += `

        <div class="transaction-card">

            <div class="transaction-left">

                <div class="transaction-icon" style="background-color: ${categoryStyle.color}20; color: ${categoryStyle.color};">

                    <i class="${iconClass}"></i>

                </div>

                <div class="transaction-info">

                    <h3>${transaction.category}</h3>

                    <p>

                        ${transaction.paymentMethod}

                        •

                        ${transaction.date}

                        •

                        ${transaction.time}

                    </p>

                    <small>

                        ${transaction.notes || ""}

                    </small>

                </div>

            </div>

            <div class="transaction-right">

                <h3 class="${amountClass}">

                    ${sign} ₹${transaction.amount}

                </h3>

                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        data-id="${transaction.id}"
                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>

                                        <button
                        class="delete-btn"
                        data-id="${transaction.id}"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    container.innerHTML = transactionsHTML;

    attachDeleteEvents();
    attachEditEvents();

    renderCharts(filters);
}

function attachDeleteEvents() {

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            showConfirmation(
                "Are you sure you want to delete this transaction?",
                () => {
                    deleteTransaction(id);
                    renderTransactions();
                    showToast("Transaction deleted.");
                }
            );

        });

    });

}

function attachEditEvents() {

    const editButtons =
        document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            startEditing(id);

            document
                .getElementById("transactionModal")
                .classList
                .add("active");

        });

    });

}