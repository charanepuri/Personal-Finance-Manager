import { generateReport } from "../services/reportService.js";
import { APP } from "../config.js";

/**
 * Calculates report data and updates the DOM elements on the reports page.
 */
export function updateReportsView() {
    // Get filter values from the DOM
    const filters = {
        type: document.getElementById("filter-type").value,
        month: document.getElementById("filter-month").value,
        year: document.getElementById("filter-year").value,
    };
    const report = generateReport(filters);

    const formatCurrency = (amount) => `${APP.CURRENCY}${amount.toLocaleString("en-IN")}`;

    const incomeEl = document.getElementById("report-income");
    const expenseEl = document.getElementById("report-expense");
    const savingsEl = document.getElementById("report-savings");
    const highestEl = document.getElementById("highest-category");

    if (incomeEl && expenseEl && savingsEl && highestEl) {
        incomeEl.textContent = formatCurrency(report.totalIncome);
        expenseEl.textContent = formatCurrency(report.totalExpense);
        savingsEl.textContent = formatCurrency(report.savings);
        highestEl.textContent = report.highestCategory;

        savingsEl.style.color = report.savings >= 0 ? "var(--success)" : "var(--danger)";
    }
}