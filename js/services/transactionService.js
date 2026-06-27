import { getTransactions } from "../storage/storage.js";

/**
 * Retrieves transactions from storage and filters them based on the provided criteria.
 * @param {object} filters - An object containing filter criteria { type, month, year }.
 * @returns {Array<object>} An array of filtered transaction objects.
 */
export function getFilteredTransactions(filters = {}) {
    let transactions = getTransactions();
    const { type, month, year } = filters;

    if (type !== "all") {
        transactions = transactions.filter(
            transaction => transaction.type === type
        );
    }

    if (month !== "all") {
        transactions = transactions.filter(
            transaction => transaction.date.split("-")[1] === month
        );
    }

    if (year !== "all") {
        transactions = transactions.filter(
            transaction => transaction.date.split("-")[0] === year
        );
    }

    return transactions;
}