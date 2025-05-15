let host = 'http://localhost:3030/jsonstore/tasks/';

// input fields
let nameInput = document.getElementById('name');
let daysInput = document.getElementById('num-days');
let dateInput = document.getElementById('from-date');

// Buttons
loadBtn = document.getElementById('load-vacations');
addBtn = document.getElementById('add-vacation');
editBtn = document.getElementById('edit-vacation');

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

// DOM
async function onLoad() {
    let vacantions = await loadVacantions();

    let section = document.getElementById('confirmed-vacantions');
    let list = document.getElementById('list');
    list.innerHTML = '';

    for (let v of vacantions) {
        let divcontainer = document.createElement('div');
        divcontainer.className = 'container';

        let h2 = document.createElement('h2');
        h2.textContent = v.name;

        let hDate = document.createElement('h3');
        hDate.textContent = v.date;

        let hDays = document.createElement('h3');
        hDays.textContent = v.days;

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.id = v._id;
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => onRecordEdit(v, list))

        let doneBtn = document.createElement('button');
        doneBtn.className = 'done-btn';
        doneBtn.dataset.id = v._id;
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            deleteVacantion(v._id);
            onLoad();
       });

        divcontainer.appendChild(h2);
        divcontainer.appendChild(hDate);
        divcontainer.appendChild(hDays);
        divcontainer.appendChild(changeBtn);
        divcontainer.appendChild(doneBtn);
        list.appendChild(divcontainer);
        section.appendChild(list);
    }
    
    editBtn.disabled = true;
}


async function onAdd() {
    let name = nameInput.value;
    let days = daysInput.value;
    let date = dateInput.value;

    if(!name || !days || !date) {
        return;
    }

    await addVacantion(name, days, date);

    nameInput.value = '';
    daysInput.value = '';
    dateInput.value = '';

    onLoad();
}

function onRecordEdit(v) {
    nameInput.value = v.name;
    daysInput.value = v.days;
    dateInput.value = v.date;

    editBtn.dataset.id = v._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}


async function onEdit() {
    let name = nameInput.value;
    let days = daysInput.value;
    let date = dateInput.value;
    let id = editBtn.dataset.id;

    if(!name || !days || !date) {
        return;
    }

    await updateVacantion(name, days, date, id);

    nameInput.value = '';
    daysInput.value = '';
    dateInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    onLoad();   
}


// API

async function loadVacantions() {
    let res = await fetch(host);

    let data = await res.json();

    return Object.values(data);
}


async function addVacantion(name, days, date) {
    let record = {
        name,
        days,
        date
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    }

    await fetch(host, options);
}

async function updateVacantion(name, days, date, _id) {
    let record = {
        name,
        days,
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

async function deleteVacantion(id) {
    let options = {
        method: 'DELETE'
    }

    fetch(host + id, options);
}