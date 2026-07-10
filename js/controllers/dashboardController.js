import { renderTransactions } from "./transactionController.js";
import { updateDashboardSummary } from "../ui/summary.js";

/**
 * Renders the initial view of the dashboard, primarily the transaction list.
 */
export function renderDashboard() {
    renderTransactions();
    updateDashboardSummary();
}