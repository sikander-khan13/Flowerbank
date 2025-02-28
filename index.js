let currentBalance = 0;
let transactions = [];

// Update the balance display
function updateBalance() {
    document.getElementById("currentBalance").innerText = `$${currentBalance.toFixed(2)}`;
}

// Show and hide interfaces
function showAddMoney() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("addMoneyInterface").classList.remove("hidden");
}

function showWithdrawMoney() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("withdrawMoneyInterface").classList.remove("hidden");
}

function showTransactionHistory() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("transactionHistoryInterface").classList.remove("hidden");
    updateTransactionHistory();
}

function goBack() {
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("addMoneyInterface").classList.add("hidden");
    document.getElementById("withdrawMoneyInterface").classList.add("hidden");
    document.getElementById("transactionHistoryInterface").classList.add("hidden");
}

// Add Money Function
function addMoney() {
    const amount = parseFloat(document.getElementById("addAmount").value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("addMoneyError").innerText = "Please enter a valid amount.";
        document.getElementById("addMoneyError").classList.remove("hidden");
        return;
    }
    currentBalance += amount;
    transactions.push({ type: "Add", amount, date: new Date().toLocaleString() });
    updateBalance();
    goBack();
}

// Withdraw Money Function
function withdrawMoney() {
    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("withdrawMoneyError").innerText = "Please enter a valid amount.";
        document.getElementById("withdrawMoneyError").classList.remove("hidden");
        return;
    }
    if (amount > currentBalance) {
        document.getElementById("withdrawMoneyError").innerText = "Insufficient balance.";
        document.getElementById("withdrawMoneyError").classList.remove("hidden");
        return;
    }
    currentBalance -= amount;
    transactions.push({ type: "Withdraw", amount, date: new Date().toLocaleString() });
    updateBalance();
    goBack();
}

// Update Transaction History
function updateTransactionHistory() {
    const historyList = document.getElementById("transactionHistory");
    historyList.innerHTML = "";
    transactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.classList.add("bg-gray-100", "p-2", "rounded-lg");
        li.innerText = `${transaction.date} - ${transaction.type}: $${transaction.amount.toFixed(2)}`;
        historyList.appendChild(li);
    });
}

// Initial balance display
updateBalance();