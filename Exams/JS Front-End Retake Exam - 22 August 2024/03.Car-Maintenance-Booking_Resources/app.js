let host = 'http://localhost:3030/jsonstore/appointments/';

// input fields
let modelInput = document.getElementById('car-model');
let serviceInput = document.getElementById('car-service');
let dateInput = document.getElementById('date');

// Buttons
loadBtn = document.getElementById('load-appointments');
addBtn = document.getElementById('add-appointment');
editBtn = document.getElementById('edit-appointment');

// Event listeners
loadBtn.addEventListener('click', onLoad);
addBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        onAdd();
    });

editBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        onEdit();
    });


// DOM Manipulations
async function onLoad() {
    let appointments = await loadAppointments();
    let list = document.getElementById('appointments-list');
    list.innerHTML = '';

    for (let a of appointments) {
        let li = document.createElement('li');
        li.className = 'appointment'

        let hModel = document.createElement('h2');
        hModel.textContent = a.model;

        let hDate = document.createElement('h3');
        hDate.textContent = a.date;

        let hService = document.createElement('h3');
        hService.textContent = a.service;

        let divButtons = document.createElement('div');
        divButtons.className = 'buttons-appointment';

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => onRecordEdit(a))

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            deleteAppointment(a._id);
            onLoad();
       });

        // Append buttons to DIV
        divButtons.appendChild(changeBtn);
        divButtons.appendChild(deleteBtn);

        // Append elements to li
        li.appendChild(hModel);
        li.appendChild(hDate);
        li.appendChild(hService);
        li.appendChild(divButtons);

        list.appendChild(li);

    }

    editBtn.disable = true;

}


async function onAdd() {
    let model = modelInput.value;
    let date = dateInput.value;
    let service = serviceInput.value;

    if(!model || !service || !date) {
        return;
    }

    await addAppointment(model, service, date);

    modelInput.value = '';
    serviceInput.value = '';
    dateInput.value = '';

    onLoad();
}


function onRecordEdit(a) {
    modelInput.value = a.model;
    serviceInput.value = a.service;
    dateInput.value = a.date;

    editBtn.dataset.id = a._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}


async function onEdit() {
    let model = modelInput.value;
    let service = serviceInput.value;
    let date = dateInput.value;
    let id = editBtn.dataset.id;

    if(!model || !service || !date) {
        return;
    }

    await updateAppointment(model, service, date, id);

    modelInput.value = '';
    serviceInput.value = '';
    dateInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    onLoad();
}

// API Manipulations
async function loadAppointments() {
    let res = await fetch(host);
    let data = await res.json();

    return Object.values(data);
}


async function addAppointment(model, service, date) {
    let record = {
        model,
        service,
        date
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    }

    await fetch(host, options);
}


async function updateAppointment(model, service, date, _id) {
    let record = {
        model,
        service,
        date,
        _id
    }

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    }

    await fetch(host + _id, options); 
}


async function deleteAppointment(id) {
    let options = {
        method: 'DELETE'
    }

    fetch(host + id, options);
}