import { getFilteredTransactions } from "../services/transactionService.js";

let expenseChart;
let summaryChart;

export function renderCharts(filters){

    const transactions = getFilteredTransactions(filters);

    const categoryTotals = {};

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction=>{

        if(transaction.type==="income"){

            income += transaction.amount;

        }else{

            expense += transaction.amount;

            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0)
                + transaction.amount;

        }

    });

    createExpenseChart(categoryTotals);

    createSummaryChart(income,expense);

}

function createExpenseChart(data){

    const ctx =
        document
        .getElementById("expenseChart")
        .getContext("2d");

    if(expenseChart){

        expenseChart.destroy();

    }

    expenseChart = new Chart(ctx,{

        type:"pie",

        data:{

            labels:Object.keys(data),

            datasets:[{

                data:Object.values(data),

                backgroundColor:[

                    "#4F46E5",

                    "#22C55E",

                    "#F59E0B",

                    "#EF4444",

                    "#06B6D4",

                    "#A855F7",

                    "#F97316",

                    "#14B8A6"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

function createSummaryChart(income,expense){

    const ctx =
        document
        .getElementById("summaryChart")
        .getContext("2d");

    if(summaryChart){

        summaryChart.destroy();

    }

    summaryChart = new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Income","Expense"],

            datasets:[{

                data:[income,expense],

                backgroundColor:[

                    "#22C55E",

                    "#EF4444"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}