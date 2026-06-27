import {
    getTransactionById,
    updateTransaction
} from "../storage/storage.js";

let editingId = null;

export function getEditingId() {
    return editingId;
}

export function clearEditingId() {
    editingId = null;
}

export function startEditing(id) {

    const transaction = getTransactionById(id);

    if (!transaction) return;

    editingId = id;

    document.getElementById("type").value = transaction.type;

    document.getElementById("amount").value = transaction.amount;

    document.getElementById("date").value = transaction.date;

    document.getElementById("notes").value = transaction.notes;

    document.getElementById("payment").value = transaction.paymentMethod;

    const typeSelect = document.getElementById("type");

    typeSelect.dispatchEvent(new Event("change"));

    document.getElementById("category").value =
        transaction.category;

    document.querySelector(".save-btn").textContent =
        "Update Transaction";

}

export function saveEditedTransaction(transaction) {

    transaction.id = editingId;

    updateTransaction(transaction);

    editingId = null;

    document.querySelector(".save-btn").textContent =
        "Save Transaction";

}