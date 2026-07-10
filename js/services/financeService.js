import { getFilteredTransactions } from "./transactionService.js";

/**
 * Calculates the summary of financial data based on provided filters.
 * @param {object} filters - The filters to apply to the transactions.
 * @returns {object} An object containing income, expense, balance, and savings.
 */
export function calculateSummary(filters) {
    const transactions = getFilteredTransactions(filters);

    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Assuming savings are a type of expense for this calculation, or adjust as needed.
    const savings = transactions
        .filter(t => t.category === "Savings")
        .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, balance, savings };
}