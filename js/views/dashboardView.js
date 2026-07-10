export function renderDashboard(container) {

    container.innerHTML = `

    <!-- Dashboard -->

    <section class="dashboard-grid">

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

                Income & Expenses

            </h3>

            <canvas id="summaryChart"></canvas>

        </div>

        <div class="chart-card">

            <h3>

                Expenses by Category

            </h3>

            <canvas id="expenseChart"></canvas>

        </div>

    </section>

    `;

}