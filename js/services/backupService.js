import { getTransactions, saveTransactions } from "../storage/storage.js";
import { showToast } from "../ui/toast.js";
import { showConfirmation } from "../ui/confirmation.js";
import { renderTransactions } from "../ui/renderer.js";

/**
 * Triggers a file download in the browser.
 * @param {string} filename - The desired name of the file.
 * @param {string} content - The content of the file.
 * @param {string} mimeType - The MIME type of the file.
 */
function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Exports all transaction data to a JSON file.
 */
export function exportJSON() {
    const transactions = getTransactions();
    const jsonString = JSON.stringify(transactions, null, 2);
    downloadFile("transactions.json", jsonString, "application/json");
    showToast("Data exported to JSON.", "success");
}

/**
 * Exports all transaction data to a CSV file.
 */
export function exportCSV() {
    const transactions = getTransactions();
    if (transactions.length === 0) {
        showToast("No transactions to export.", "warning");
        return;
    }

    const headers = Object.keys(transactions[0]).join(",");
    const rows = transactions.map(t => Object.values(t).join(",")).join("\n");
    const csvString = `${headers}\n${rows}`;

    downloadFile("transactions.csv", csvString, "text/csv");
    showToast("Data exported to CSV.", "success");
}

/**
 * Imports transaction data from a JSON file.
 * @param {File} file - The JSON file to import.
 */
export function importJSON(file) {
    if (!file || file.type !== "application/json") {
        showToast("Please select a valid JSON file.", "error");
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);

            if (!Array.isArray(importedData)) {
                throw new Error("Invalid JSON format. Expected an array of transactions.");
            }

            showConfirmation(
                "Importing this file will overwrite all current data. Are you sure you want to proceed?",
                () => {
                    saveTransactions(importedData);
                    renderTransactions();
                    showToast("Data imported successfully!", "success");
                }
            );

        } catch (error) {
            showToast(`Import failed: ${error.message}`, "error");
        }
    };

    reader.onerror = () => {
        showToast("Failed to read the file.", "error");
    };

    reader.readAsText(file);
}