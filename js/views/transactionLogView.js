/**
 * Renders a generic page for displaying a list of transactions with filters.
 * @param {HTMLElement} container - The DOM element to render the view into.
 * @param {object} options - Configuration for the view.
 * @param {string} options.title - The title to display on the page.
 * @param {string} options.type - The transaction type to pre-filter ('income' or 'expense').
 */
export function renderTransactionLog(container, { title, type }) {
    container.innerHTML = `
    <section class="page">
        <div class="page-header">
            <h1>${title}</h1>
            <p>A detailed log of all your ${type} transactions.</p>
        </div>

        <!-- Filters -->
        <section class="filters">
            <!-- The 'type' filter is hidden but present, locked to the page type -->
            <select id="filter-type" style="display: none;">
                <option value="${type}" selected>${type}</option>
            </select>

            <select id="filter-month">
                <option value="all">All Months</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>

            <select id="filter-year">
                <option value="all">All Years</option>
            </select>
        </section>

        <!-- Transactions -->
        <section class="transactions">
            <div id="transaction-list">
                <!-- Transactions will be rendered here -->
            </div>
        </section>

        <!-- Charts -->
        <section class="charts-section">
            <div class="chart-card">
                <h3>
                    ${type === 'expense' ? 'Expenses by Category' : 'Income by Category'}
                </h3>
                <canvas id="expenseChart"></canvas>
            </div>
            <div class="chart-card">
                <h3>
                    Monthly Trend
                </h3>
                <canvas id="summaryChart"></canvas>
            </div>
        </section>
    </section>
    `;
}