/**
 * Retrieves the current filter values from the dashboard UI.
 * @returns {object} An object containing the filter values { type, month, year }.
 */
export function getFilterValues() {
    const filterType = document.getElementById("filter-type");
    const filterMonth = document.getElementById("filter-month");
    const filterYear = document.getElementById("filter-year");

    // If filters don't exist (e.g., on the dashboard), default to current month/year.
    if (!filterType || !filterMonth || !filterYear) {
        const now = new Date();
        return {
            type: "all",
            month: String(now.getMonth() + 1).padStart(2, '0'),
            year: String(now.getFullYear()),
        };
    }

    return {
        type: filterType.value,
        month: filterMonth.value,
        year: filterYear.value,
    };
}