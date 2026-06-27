import { getBudgets, saveBudgets, calculateSpentAmounts } from "../services/budgetService.js";
import { APP } from "../config.js";
import { showToast } from "../ui/toast.js";

/**
 * Initializes the budgets page by rendering the budget items.
 */
export function initializeBudgets() {
    renderBudgetItems();
}

/**
 * Renders the list of budget items with their progress.
 */
function renderBudgetItems() {
    const container = document.getElementById("budget-list");
    if (!container) return;

    const budgets = getBudgets();
    const spentAmounts = calculateSpentAmounts();

    container.innerHTML = ""; // Clear previous content

    for (const category in budgets) {
        const budgetAmount = budgets[category];
        const spentAmount = spentAmounts[category] || 0;
        const progress = (spentAmount / budgetAmount) * 100;
        const remaining = budgetAmount - spentAmount;

        let progressClass = "progress-bar-safe";
        if (progress > 75) progressClass = "progress-bar-warning";
        if (progress >= 100) progressClass = "progress-bar-danger";

        const budgetItemHTML = `
            <div class="budget-item">
                <div class="budget-info">
                    <h4>${category}</h4>
                    <p>
                        <span class="spent-amount">${APP.CURRENCY}${spentAmount.toLocaleString('en-IN')}</span> of 
                        <span class="total-budget">${APP.CURRENCY}${budgetAmount.toLocaleString('en-IN')}</span>
                    </p>
                </div>
                <div class="budget-progress">
                    <div class="progress-bar-container">
                        <div class="progress-bar ${progressClass}" style="width: ${Math.min(progress, 100)}%;"></div>
                    </div>
                    <small>Remaining: ${APP.CURRENCY}${remaining.toLocaleString('en-IN')}</small>
                </div>
                <div class="budget-edit">
                    <input type="number" class="budget-input" data-category="${category}" value="${budgetAmount}" />
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", budgetItemHTML);
    }

    attachBudgetInputEvents();
}

/**
 * Attaches 'change' event listeners to budget input fields.
 */
function attachBudgetInputEvents() {
    document.querySelectorAll(".budget-input").forEach(input => {
        input.addEventListener("change", (e) => {
            const category = e.target.dataset.category;
            const newAmount = parseInt(e.target.value, 10);

            if (!isNaN(newAmount) && newAmount >= 0) {
                const budgets = getBudgets();
                budgets[category] = newAmount;
                saveBudgets(budgets);
                showToast("Budget updated successfully.", "success");
                renderBudgetItems(); // Re-render to update view
            } else {
                showToast("Please enter a valid budget amount.", "warning");
                e.target.value = getBudgets()[category]; // Revert to old value
            }
        });
    });
}