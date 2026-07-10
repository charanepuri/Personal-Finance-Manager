import { showToast } from "../ui/toast.js";

const STORAGE_KEY = "theme";
const themeToggleBtn = document.getElementById("theme-toggle");

export function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || "dark";
    applyTheme(savedTheme);
    themeToggleBtn.addEventListener("click", toggleTheme);
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem(STORAGE_KEY) || "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme} mode.`, "success");
}

function applyTheme(theme) {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    updateIcon(theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
}

function updateIcon(isDark) {
    const icon = themeToggleBtn.querySelector("i");

    // If the icon element doesn't exist yet (initial load), create it.
    if (!icon) {
        themeToggleBtn.innerHTML = isDark
            ? `<i class="fa-solid fa-sun"></i>`
            : `<i class="fa-solid fa-moon"></i>`;
        return;
    }

    if (isDark) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}