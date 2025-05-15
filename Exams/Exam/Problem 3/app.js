let host = 'http://localhost:3030/jsonstore/orders';

// Form and input fiels
let form = document.querySelector('form');
let nameInput = document.getElementById('name');
let quantityInput = document.getElementById('quantity');
let dateInput = document.getElementById('date');

// List 
let list = document.getElementById('list');

// Buttons
let loadBtn = document.getElementById('load-orders');
let addBtn = document.getElementById('order-btn');
let editBtn = document.getElementById('edit-order');

// Event listeners
loadBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    onLoad();
});

addBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    onAdd();
});

editBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    onEdit();
});


// DOM Maanipulation
// Load
async function onLoad() {
    list.replaceChildren();
    let orders = await loadOrders();

    for (let order of orders) {
        // TODO Elements

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => {
            onOrderEdit(order)
            onLoad();
        });

        let doneBtn = document.createElement('button');
        doneBtn.className = 'done-btn';
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', () => {
            deleteOrder(order._id)
            onLoad();
        });

        // Append elements to list
        // TODO
    }
    
}

// Add
async function onAdd() {
    let name = nameInput.value;
    let quantity = quantityInput.value;
    let date = dateInput.value;

    if (!name || !quantity || !date) {
        return;
    }

    await addOrder(name, quantity, date)

    form.reset();
    onLoad();
}

// Edit form
function onOrderEdit(order) {
    nameInput.value = order.name;
    quantityInput.value = order.quantity;
    dateInput.value = order.date;
    editBtn.dataset.id = order._id;

    addBtn.disabled = true;
    editBtn.disabled = false;    
}

// Edit
async function onEdit() {
    let name = nameInput.value;
    let quantity = quantityInput.value;
    let date = dateInput.value;
    let id = editBtn.dataset.id;

    await updateOrder(name, quantity, date, id);

    addBtn.disabled = false;
    editBtn.disabled = true;     

    form.reset();
    onLoad();
}


// API Manipulation
// Load
async function loadOrders() {
    let res = await fetch(host);

    if (!res.status == 204) {
        return [];
    }

    let data = await res.json();

    return Object.values(data);
}

// Add
async function addOrder(name, quantity, date) {
    let order = {
        name,
        quantity,
        date
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }

    await fetch(host, options);
}

// Update
async function updateOrder(name, quantity, date, _id) {
    let order = {
        name,
        quantity,
        date,
        _id
    }

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }

    await fetch(`${host}/${_id}`, options);
}

// Delete
async function deleteOrder(id) {
    await fetch(`${host}/${id}`, { method: 'DELETE' })
}