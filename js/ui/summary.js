import { calculateSummary } from "../services/financeService.js";
import { getFilterValues } from "./filters.js";
import { getTransactions } from "../storage/storage.js";
import { APP } from "../config.js";

/**
 * Updates the summary cards on the dashboard (Income, Expense, Balance, Savings).
 */
export function updateDashboardSummary() {
    const monthlyFilters = getFilterValues();

    // Calculate monthly income, expense, and savings for the stat cards
    const { income, expense, savings } = calculateSummary(monthlyFilters);

    // Calculate the all-time balance for the main "Available Balance" card
    const allTransactions = getTransactions();
    const allTimeIncome = allTransactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const allTimeExpense = allTransactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const allTimeBalance = allTimeIncome - allTimeExpense;

    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const savingsEl = document.getElementById("savings");

    if (balanceEl) {
        balanceEl.textContent = `${APP.CURRENCY}${allTimeBalance.toLocaleString("en-IN")}`;
    }
    if (incomeEl) {
        incomeEl.textContent = `${APP.CURRENCY}${income.toLocaleString("en-IN")}`;
    }
    if (expenseEl) {
        expenseEl.textContent = `${APP.CURRENCY}${expense.toLocaleString("en-IN")}`;
    }
    if (savingsEl) {
        savingsEl.textContent = `${APP.CURRENCY}${savings.toLocaleString("en-IN")}`;
    }
}