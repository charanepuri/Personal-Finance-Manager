const modal = document.getElementById("confirmationModal");
const messageEl = document.getElementById("confirmationMessage");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelConfirmBtn");
const closeBtn = document.getElementById("closeConfirmationModal");

let onConfirmCallback = null;

/**
 * Shows a confirmation modal with a message and executes a callback on confirmation.
 * @param {string} message - The message to display in the modal.
 * @param {Function} onConfirm - The function to execute if the user confirms.
 */
export function showConfirmation(message, onConfirm) {
    messageEl.textContent = message;
    onConfirmCallback = onConfirm;
    modal.classList.add("active");
}

function hide() {
    modal.classList.remove("active");
    onConfirmCallback = null;
}

function handleConfirm() {
    if (typeof onConfirmCallback === "function") {
        onConfirmCallback();
    }
    hide();
}

function handleCancel() {
    hide();
}

function handleOverlayClick(event) {
    if (event.target === modal) {
        hide();
    }
}

confirmBtn.addEventListener("click", handleConfirm);
cancelBtn.addEventListener("click", handleCancel);
closeBtn.addEventListener("click", handleCancel);
modal.addEventListener("click", handleOverlayClick);