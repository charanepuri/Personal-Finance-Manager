export function renderSettings(container){

    container.innerHTML = `

    <section class="page">

        <div class="page-header">

            <h1>Settings</h1>

            <p>Manage your application preferences.</p>

        </div>

        <div class="settings-grid">

            <div class="setting-card">

                <h3>Theme</h3>

                <button id="theme-toggle-settings">

                    Toggle Theme

                </button>

            </div>

            <div class="setting-card">

                <h3>Backup</h3>

                <button id="export-json">

                    Export JSON

                </button>

            </div>

            <div class="setting-card">

                <h3>Export CSV</h3>

                <button id="export-csv">

                    Export CSV

                </button>

            </div>

            <div class="setting-card">

                <h3>Restore Backup</h3>

                <input
                    type="file"
                    id="import-json"
                    accept=".json">

            </div>

        </div>

    </section>

    `;

}