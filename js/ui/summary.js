import { calculateSummary } from "../services/financeService.js";
import { getFilterValues } from "./filters.js";

/**
 * Updates the summary cards on the dashboard (Income, Expense, Balance, Savings).
 */
export function updateDashboardSummary() {
    const filters = getFilterValues();

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