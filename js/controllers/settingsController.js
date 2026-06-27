import { exportJSON, exportCSV, importJSON } from "../services/backupService.js";

/**
 * Initializes the settings page by attaching event listeners for data management.
 */
export function initializeSettings() {
    const exportJsonBtn = document.getElementById("export-json-btn");
    const exportCsvBtn = document.getElementById("export-csv-btn");
    const importJsonInput = document.getElementById("import-json-input");

    if (exportJsonBtn) {
        exportJsonBtn.addEventListener("click", exportJSON);
    }

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", exportCSV);
    }

    if (importJsonInput) {
        importJsonInput.addEventListener("change", (event) => {
            if (event.target.files.length) importJSON(event.target.files[0]);
        });
    }
}