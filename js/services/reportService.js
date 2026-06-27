import { getFilteredTransactions } from "./transactionService.js";

/**
 * Calculates the total income from the filtered transactions.
 * @returns {number} The total income.
 */
function calculateTotalIncome(filters) {
    const transactions = getFilteredTransactions(filters);
    return transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculates the total expense from the filtered transactions.
 * @returns {number} The total expense.
 */
function calculateTotalExpense(filters) {
    const transactions = getFilteredTransactions(filters);
    return transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Finds the category with the highest total expense.
 * @returns {string} The name of the category with the highest expense, or "N/A".
 */
function findHighestExpenseCategory(filters) {
    const transactions = getFilteredTransactions(filters);
    const expenseByCategory = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    if (Object.keys(expenseByCategory).length === 0) {
        return "N/A";
    }

    return Object.keys(expenseByCategory).reduce((a, b) =>
        expenseByCategory[a] > expenseByCategory[b] ? a : b
    );
}

/**
 * Generates a complete financial report based on filtered transactions.
 */
export function generateReport(filters) {
    const totalIncome = calculateTotalIncome(filters);
    const totalExpense = calculateTotalExpense(filters);
    const savings = totalIncome - totalExpense;
    const highestCategory = findHighestExpenseCategory(filters);

    return { totalIncome, totalExpense, savings, highestCategory };
}