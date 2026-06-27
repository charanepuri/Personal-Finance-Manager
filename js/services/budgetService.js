import { APP, DEFAULT_BUDGETS } from "../config.js";
import { getTransactions } from "../storage/storage.js";

const BUDGET_STORAGE_KEY = `${APP.STORAGE_KEY}-budgets`;

/**
 * Retrieves budgets from localStorage or returns default budgets if none are set.
 * @returns {object} The user's budgets.
 */
export function getBudgets() {
    const savedBudgets = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (savedBudgets) {
        return JSON.parse(savedBudgets);
    }
    // If no budgets are saved, set and return the default ones.
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
    return DEFAULT_BUDGETS;
}

/**
 * Saves the budgets object to localStorage.
 * @param {object} budgets - The budgets to save.
 */
export function saveBudgets(budgets) {
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
}

/**
 * Calculates total spending for each category for the current month.
 * @returns {object} An object with categories as keys and total spent amount as values.
 */
export function calculateSpentAmounts() {
    const transactions = getTransactions();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const spentAmounts = {};

    transactions
        .filter(t => t.type === "expense")
        .forEach(t => {
            const transactionDate = new Date(t.date);
            if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
                if (spentAmounts[t.category]) {
                    spentAmounts[t.category] += t.amount;
                } else {
                    spentAmounts[t.category] = t.amount;
                }
            }
        });

    return spentAmounts;
}