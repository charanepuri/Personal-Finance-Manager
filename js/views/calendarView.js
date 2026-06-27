export function renderCalendar(container){

    container.innerHTML = `

    <section class="page">

        <div class="page-header">

            <h1>Calendar</h1>

            <p>View your transactions by date.</p>

        </div>

        <div class="calendar-container">

            <div class="calendar-header">

                <button id="prev-month">

                    <i class="fa-solid fa-chevron-left"></i>

                </button>

                <h2 id="month-title"></h2>

                <button id="next-month">

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </div>

            <div id="calendar-grid"></div>

        </div>

        <div id="day-transactions"></div>

    </section>

    `;

}