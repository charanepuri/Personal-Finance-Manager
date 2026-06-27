import { calculateSummary } from "../services/financeService.js";

export function updateDashboard(filters) {

    const {

        income,
        expense,
        balance,
        savings

    } = calculateSummary(filters);

    document.getElementById("balance").textContent =
        `₹${balance.toLocaleString("en-IN")}`;

    document.getElementById("income").textContent =
        `₹${income.toLocaleString("en-IN")}`;

    document.getElementById("expense").textContent =
        `₹${expense.toLocaleString("en-IN")}`;

    document.getElementById("savings").textContent =
        `₹${savings.toLocaleString("en-IN")}`;

}

import { renderTransactions } from "../ui/renderer.js";

export function initializeDashboard(){

    renderTransactions();

}