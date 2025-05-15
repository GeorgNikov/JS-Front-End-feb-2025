let host = 'http://localhost:3030/jsonstore/reservations';

// Form and input fiels
let form = document.querySelector('form');
let namesInput = document.getElementById('names');
let daysInput = document.getElementById('days');
let dateInput = document.getElementById('date');

// List 
let list = document.getElementById('list');

// Buttons
let loadBtn = document.getElementById('load-history');
let addBtn = document.getElementById('add-reservation');
let editBtn = document.getElementById('edit-reservation');

// Event listeners
loadBtn.addEventListener('click', async () => {
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
    let reservations = await loadReservations();


    for (let r of reservations) {
        let container = document.createElement('div');
        container.className = 'container';

        let hNames = document.createElement('h2');
        hNames.textContent = r.names;

        let hdays = document.createElement('h3');
        hdays.className = 'reservation_days';
        hdays.textContent = r.days;

        let hDate = document.createElement('h3');
        hdays.textContent = r.date;

        let btnContainer = document.createElement('div');
        btnContainer.className = 'buttons-container';

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => {
            onOrderEdit(r)
            onLoad();
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteReservation(r._id)
            onLoad();
        });

        // Append elements to list
        btnContainer.appendChild(changeBtn);
        btnContainer.appendChild(deleteBtn);

        container.appendChild(hNames)
        container.appendChild(hDate)
        container.appendChild(hdays)
        container.appendChild(btnContainer)

        list.appendChild(container)
    }

}

// Add
async function onAdd() {
    let names = namesInput.value;
    let days = daysInput.value;
    let date = dateInput.value;

    if (!names || !days || !date) {
        return;
    }

    await addReservation(names, days, date)

    form.reset();
    onLoad();
}

// Edit form
function onOrderEdit(r) {
    namesInput.value = r.names;
    daysInput.value = r.days;
    dateInput.value = r.date;
    editBtn.dataset.id = r._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}

// Edit
async function onEdit() {
    let names = namesInput.value;
    let days = daysInput.value;
    let date = dateInput.value;
    let id = editBtn.dataset.id;

    await updateReservation(names, days, date, id);

    addBtn.disabled = false;
    editBtn.disabled = true;

    form.reset();
    onLoad();
}


// API Manipulation
// Load
async function loadReservations() {
    let res = await fetch(host);

    if (!res.status == 204) {
        return [];
    }

    let data = await res.json();

    return Object.values(data);
}

// Add
async function addReservation(names, days, date) {
    let order = {
        names,
        days,
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
async function updateReservation(names, days, date, _id) {
    let order = {
        names,
        days,
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
async function deleteReservation(id) {
    await fetch(`${host}/${id}`, { method: 'DELETE' })
}