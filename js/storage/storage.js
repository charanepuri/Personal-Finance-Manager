import { APP } from "../config.js";

const STORAGE_KEY = APP.STORAGE_KEY;

/* ==========================================
   Get Transactions
========================================== */

export function getTransactions() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    ) || [];

}

/* ==========================================
   Save Transactions
========================================== */

export function saveTransactions(transactions) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(transactions)

    );

}

/* ==========================================
   Add Transaction
========================================== */

export function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.unshift(transaction);

    saveTransactions(transactions);

}

/* ==========================================
   Delete Transaction
========================================== */

export function deleteTransaction(id) {

    const transactions = getTransactions().filter(

        transaction => transaction.id !== id

    );

    saveTransactions(transactions);

}

/* ==========================================
   Get Transaction By ID
========================================== */

export function getTransactionById(id) {

    return getTransactions().find(

        transaction => transaction.id === id

    );

}

/* ==========================================
   Update Transaction
========================================== */

export function updateTransaction(updatedTransaction) {

    const transactions = getTransactions().map(transaction =>

        transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction

    );

    saveTransactions(transactions);

}