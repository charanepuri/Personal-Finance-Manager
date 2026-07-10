import { exportJSON, exportCSV, importJSON } from "../services/backupService.js";
import { toggleTheme } from "./themeController.js";

/**
 * Initializes the settings page by attaching event listeners for data management.
 */
export function initializeSettings() {
    const themeToggleSettingsBtn = document.getElementById("theme-toggle-settings");
    const exportJsonBtn = document.getElementById("export-json");
    const exportCsvBtn = document.getElementById("export-csv");
    const importJsonInput = document.getElementById("import-json");

    if (themeToggleSettingsBtn) {
        themeToggleSettingsBtn.addEventListener("click", toggleTheme);
    }

    if (exportJsonBtn) {
        exportJsonBtn.addEventListener("click", exportJSON);
    }

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", exportCSV);
    }

    if (importJsonInput) {
        importJsonInput.addEventListener("change", (event) => {
            if (event.target.files.length > 0) importJSON(event.target.files[0]);
        });
    }
}