export function renderDashboard(container) {

    container.innerHTML = `

    <!-- Dashboard -->

    <section class="dashboard">

        <div class="balance-card">

            <div>

                <h3>Available Balance</h3>

                <h1 id="balance">₹0</h1>

            </div>

            <p>

                Manage your money with confidence.

            </p>

        </div>

        <div class="stats">

            <div class="stat-card">

                <div class="icon income-icon">

                    <i class="fa-solid fa-arrow-trend-up"></i>

                </div>

                <h4>Income</h4>

                <h2 id="income">₹0</h2>

            </div>

            <div class="stat-card">

                <div class="icon expense-icon">

                    <i class="fa-solid fa-arrow-trend-down"></i>

                </div>

                <h4>Expense</h4>

                <h2 id="expense">₹0</h2>

            </div>

            <div class="stat-card">

                <div class="icon saving-icon">

                    <i class="fa-solid fa-piggy-bank"></i>

                </div>

                <h4>Savings</h4>

                <h2 id="savings">₹0</h2>

            </div>

            <div class="stat-card">

                <div class="icon budget-icon">

                    <i class="fa-solid fa-bullseye"></i>

                </div>

                <h4>Budget Left</h4>

                <h2 id="budget">₹0</h2>

            </div>

        </div>

    </section>

    <!-- Backup -->

    <div class="backup-actions">

        <button id="export-json">

            Export JSON

        </button>

        <button id="export-csv">

            Export CSV

        </button>

        <label class="import-btn">

            Import JSON

            <input
                type="file"
                id="import-json"
                accept=".json"
                hidden>

        </label>

    </div>

    <!-- Filters -->

    <section class="filters">

        <select id="filter-type">

            <option value="all">

                All Transactions

            </option>

            <option value="income">

                Income

            </option>

            <option value="expense">

                Expense

            </option>

        </select>

        <select id="filter-month">

            <option value="all">

                All Months

            </option>

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

            <option value="all">

                All Years

            </option>

        </select>

    </section>

    <!-- Transactions -->

    <section class="transactions">

        <div class="section-header">

            <h2>

                Recent Transactions

            </h2>

        </div>

        <div id="transaction-list">

        </div>

    </section>

    <!-- Charts -->

    <section class="charts-section">

        <div class="chart-card">

            <h3>

                Expenses by Category

            </h3>

            <canvas id="expenseChart"></canvas>

        </div>

        <div class="chart-card">

            <h3>

                Income vs Expense

            </h3>

            <canvas id="summaryChart"></canvas>

        </div>

    </section>

    `;

}