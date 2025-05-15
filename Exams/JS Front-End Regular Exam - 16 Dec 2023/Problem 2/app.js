window.addEventListener('load', solve);

function solve(){
    // Form and form input fields
    let form = document.querySelector('form');
    let expenseInput = document.getElementById('expense')
    let amountInput = document.getElementById('amount')
    let dateInput = document.getElementById('date')

    // Lists
    let previewList = document.getElementById('preview-list');
    let expensesList = document.getElementById('expenses-list');

    // Buttons and Event listeners
    let btnSave = document.getElementById('add-btn');
    btnSave.addEventListener('click', (ev) => {
        ev.preventDefault();
        onAdd();
    });

    let delBtn = document.querySelector('.btn.delete');
    delBtn.addEventListener('click', onDelete);


    // Add
    function onAdd() {
        let expense = expenseInput.value;
        let amount = amountInput.value;
        let date = dateInput.value;

        if (!expense || !amount || !date) {
            return;
        }

        let li = document.createElement('li');
        li.className = 'expense-item';

        let article = document.createElement('article');

        let pExpense = document.createElement('p');
        pExpense.textContent = `Type: ${expense}`;

        let pAmount = document.createElement('p');
        pAmount.textContent = `Amount: ${amount}$`;

        let pDate = document.createElement('p');
        pDate.textContent = `Date: ${date}`;

        // Append elements to article
        article.appendChild(pExpense);
        article.appendChild(pAmount);
        article.appendChild(pDate);

        li.appendChild(article);  // NOT append python DEV

        let divButtons = document.createElement('div');
        divButtons.className = 'buttons';

        let editBtn = document.createElement('button');
        editBtn.className = 'btn edit';
        editBtn.textContent = 'edit';
        editBtn.addEventListener('click', () => onEdit(expense, amount, date, li));

        let doneBtn = document.createElement('button');
        doneBtn.className = 'btn ok';
        doneBtn.textContent = 'ok';
        doneBtn.addEventListener('click', () => onDone(li, article));

        // Append buttons to div
        divButtons.appendChild(editBtn);
        divButtons.appendChild(doneBtn);

        // Append elements to list
        li.appendChild(divButtons);
        previewList.appendChild(li)

        // Form input fields reset!
        form.reset();

        // Disable add button
        btnSave.disabled = true;
    }

    function onEdit(expense, amount, date, li) {
        expenseInput.value = expense;
        amountInput.value = amount;
        dateInput.value = date;

        previewList.removeChild(li);
        btnSave.disabled = false;
    }

    function onDone(li, article) {
        let newLi = document.createElement('li');
        newLi.className = 'expense-item';
        newLi.appendChild(article);
    
        previewList.removeChild(li);
        expensesList.appendChild(newLi);
    
        btnSave.disabled = false;
    }

    function onDelete() {
        location.reload();
    }
}
