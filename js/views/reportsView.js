import { updateReportsView } from "../controllers/reportController.js";
import { initializeDashboard } from "../app.js"; // We need the filter logic

export function renderReports(container) {

    container.innerHTML = `

    <section class="page">

        <div class="page-header">

            <h1>Reports</h1>

            <p>Monthly and yearly financial insights.</p>

        </div>

        <!-- Filters -->
        <div class="filters">
            <select id="filter-type">
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
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
        </div>

        <div class="report-grid">

            <div class="report-card">

                <h3>Total Income</h3>

                <h2 id="report-income">₹0</h2>

            </div>

            <div class="report-card">

                <h3>Total Expense</h3>

                <h2 id="report-expense">₹0</h2>

            </div>

            <div class="report-card">

                <h3>Savings</h3>

                <h2 id="report-savings">₹0</h2>

            </div>

            <div class="report-card">

                <h3>Highest Expense</h3>

                <h2 id="highest-category">N/A</h2>

            </div>

        </div>

    </section>

    `;

    // Initialize filter event listeners and load year options
    const filterType = document.getElementById("filter-type");
    const filterMonth = document.getElementById("filter-month");
    const filterYear = document.getElementById("filter-year");

    filterType.addEventListener("change", updateReportsView);
    filterMonth.addEventListener("change", updateReportsView);
    filterYear.addEventListener("change", updateReportsView);

    updateReportsView();

}