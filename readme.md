# Personal Finance Manager

A comprehensive, client-side web application for managing your personal finances. Track your income, expenses, budgets, and financial goals with an intuitive and responsive interface.

## ✨ Features

- **Dashboard**: Get a quick overview of your financial health with summary cards for balance, income, expenses, and savings. Visual charts provide insights into your cash flow and spending habits.
- **Transaction Management**: Easily add, edit, and delete income and expense transactions through a user-friendly modal form.
- **Detailed Logs**: View dedicated pages for all your income and expense transactions, complete with filtering by month and year.
- **Financial Reports**: Analyze your financial data with a dedicated reports page showing total income, expenses, and savings based on selected time periods.
- **Calendar View**: Visualize your daily transactions on an interactive calendar to see your spending patterns over the month.
- **Budget Tracking**: Set monthly budgets for various expense categories and track your spending against them with clear progress bars.
- **Wishlist**: Keep a separate list of your financial goals and desired purchases, tracking the total amount needed without affecting your main budget.
- **Customization & Settings**:
  - **Dark/Light Mode**: Switch between themes for comfortable viewing.
  - **Data Management**: Export your data to JSON or CSV, import from a JSON backup, and reset the application data.
- **Responsive Design**: Fully responsive and mobile-first, ensuring a seamless experience on desktops, tablets, and mobile phones.
- **Local Data Storage**: All your financial data is securely stored in your browser's local storage, ensuring privacy and offline access.

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (with custom properties for theming)
- **JavaScript (ES6+ Modules)**: No frameworks, just pure vanilla JS!

## 🚀 Getting Started

This is a purely client-side application and does not require a complex backend setup. You just need a local web server to run it, as modern browsers restrict the use of JavaScript modules (`import`/`export`) over the `file:///` protocol.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- A local web server.

### Installation & Setup

1.  **Clone the repository (or download the files):**

    ```bash
    git clone https://github.com/charanepuri/Personal-Finance-Manager
    cd personal-finance-manager
    ```

2.  **Run a local server.** Here are two easy options:

    **Option A: Using the VS Code Live Server Extension (Easiest)**
    - Install the Live Server extension in Visual Studio Code.
    - Right-click the `index.html` file and select "Open with Live Server".

    **Option B: Using Python's built-in server**
    - Make sure you have Python installed.
    - Open a terminal in the project's root directory.
    - Run the following command (use `python` or `python3` depending on your system):
      ```bash
      python3 -m http.server
      ```
    - Open your browser and navigate to `http://localhost:8000`.

## 📂 Project Structure

The project is organized with a clear separation of concerns to make it maintainable and scalable.

```
Personal-Finance-Manager/
├── css/                # All CSS files for styling
│   ├── components.css
│   ├── layout.css
│   ├── responsive.css
│   └── ...
├── js/                 # All JavaScript files
│   ├── controllers/    # Logic for handling user input and updating views
│   ├── services/       # Business logic (calculations, data manipulation)
│   ├── storage/        # Interaction with localStorage
│   ├── ui/             # UI-specific logic (modals, navigation, toasts)
│   ├── views/          # Functions that render HTML for each page
│   ├── app.js          # Main application entry point and global logic
│   └── config.js       # Application configuration (categories, etc.)
├── index.html          # Main HTML file
└── README.md           # You are here!
```

## How to Use

1.  **Add a Transaction**: Click the floating `+` button to open the form. Fill in the details and save.
2.  **Navigate**: Use the navigation bar (at the bottom on mobile, on the left on desktop) to switch between different pages like Dashboard, Reports, and Budgets.
3.  **Filter Data**: On the Income, Expense, and Reports pages, use the dropdown menus to filter your transactions by month and year.
4.  **Manage Data**: Go to the Settings page to back up your data by exporting it to a file, or to import a previous backup.

---

## 👨‍💻 Author

**Charan Teja Epuri**

Aspiring FrontEnd Developer / Aspiring Full Stack Developer

### Connect & Follow

- GitHub: [Profile](https://github.com/charanepuri)
- LinkedIn: [Profile](https://www.linkedin.com/in/charan-teja-972aa9231)

### Explore

- Portfolio(Django): [Link](https://portfolio-site-django.onrender.com)
- Portfolio(React): [Link](https://charan-react-portfolio.vercel.app)
- Portfolio(Flask): [Link](https://flask-developer-dashboard-portfolio.onrender.com)
