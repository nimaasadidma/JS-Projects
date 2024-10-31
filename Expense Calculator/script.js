const expensesByUser = {};

// Add event listener for adding a new user
document.getElementById('addUserBtn').addEventListener('click', function() {
    const newUser = document.getElementById('newUser').value.trim();
    
    // Check if user already exists
    if (newUser && !expensesByUser[newUser]) {
        expensesByUser[newUser] = [];
        
        // Add user to the dropdown
        const userSelect = document.getElementById('userSelect');
        const userOption = document.createElement('option');
        userOption.value = newUser;
        userOption.textContent = newUser;
        userSelect.appendChild(userOption);

        // Clear input field
        document.getElementById('newUser').value = '';
        
        // Clear the selection if a new user is added
        userSelect.value = newUser;
        toggleNewUserField();
    } else {
        alert('User already exists or name is empty.');
    }
});

// Add event listener for user selection
document.getElementById('userSelect').addEventListener('change', function () {
    const selectedUser = this.value;
    displayExpenses(selectedUser);
    toggleNewUserField();
});

// Toggle the new user input field based on the user selection
function toggleNewUserField() {
    const userSelect = document.getElementById('userSelect');
    const newUserInput = document.getElementById('newUser');
    const addUserBtn = document.getElementById('addUserBtn');

    if (userSelect.value) {
        newUserInput.disabled = true; // Disable new user input when a user is selected
        addUserBtn.disabled = true; // Disable button
    } else {
        newUserInput.disabled = false; // Enable new user input when no user is selected
        addUserBtn.disabled = false; // Enable button
    }
}

// Add event listener for expense form submission
document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const user = document.getElementById('userSelect').value;
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseDate = document.getElementById('expenseDate').value;
    const expenseCategory = document.getElementById('expenseCategory').value;

    // Create a new expense object
    const expense = {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
        category: expenseCategory
    };

    // Add the expense to the corresponding user's list
    if (user) {
        expensesByUser[user].push(expense);
        
        // Update the expense list display
        displayExpenses(user);
        
        // Clear the form fields
        document.getElementById('expenseForm').reset();
    } else {
        alert('Please select a user to add an expense.');
    }
});

// Function to display expenses for the selected user
function displayExpenses(user) {
    const expenseList = document.getElementById('expenseList');
    const totalAmountSpan = document.getElementById('totalAmount');
    const selectedUserSpan = document.getElementById('selectedUser');

    // Clear the current list and total amount
    expenseList.innerHTML = '';
    let totalAmount = 0;

    // Display expenses for the selected user
    if (expensesByUser[user]) {
        expensesByUser[user].forEach(expense => {
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)} (${expense.category}) on ${new Date(expense.date).toLocaleDateString()}
                <button class="delete-btn" onclick="deleteExpense('${user}', this)">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
            totalAmount += expense.amount;
        });
    }

    // Update total amount display
    totalAmountSpan.innerText = `$${totalAmount.toFixed(2)}`;
    selectedUserSpan.innerText = user || 'User';
}

// Function to delete an expense
function deleteExpense(user, button) {
    const expenseItem = button.parentElement;
    const amount = parseFloat(expenseItem.innerText.match(/\$(\d+(\.\d+)?)/)[1]);

    // Remove the expense item from the user's list
    expensesByUser[user] = expensesByUser[user].filter(expense => expense.amount !== amount);
    
    // Update the expense display
    displayExpenses(user);
}
