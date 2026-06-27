import { getFilteredTransactions } from "./transactionService.js";

export function calculateSummary(filters) {

    const transactions = getFilteredTransactions(filters);

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    const balance = income - expense;

    const savings = balance;

    return {

        income,
        expense,
        balance,
        savings

    };

}