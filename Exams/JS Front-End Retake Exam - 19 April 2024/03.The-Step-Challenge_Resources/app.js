let host = 'http://localhost:3030/jsonstore/records/';

// Form input fields
const nameInput = document.getElementById('p-name');
const stepsInput = document.getElementById('steps');
const caloriesInput = document.getElementById('calories');

// Buttons
const loadBtn = document.getElementById('load-records');
const addBtn = document.getElementById('add-record');
const editBtn = document.getElementById('edit-record');

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
    let records = await loadRecords();

    let list = document.getElementById('list');
    list.innerHTML = '';

    for (let r of records) {
        let li = document.createElement('li');
        li.className = 'record';

        let divInfo = document.createElement('div');
        divInfo.className = 'info';

        let pName = document.createElement('p');
        pName.textContent = r.name;

        let pSteps = document.createElement('p');
        pSteps.textContent = r.steps;

        let pCalories = document.createElement('p');
        pCalories.textContent = r.calories;

        let divBtnContainer = document.createElement('div');
        divBtnContainer.className = 'btn-wrapper';

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => onRecordEdit(r));

        let delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            deleteRecord(r._id);
            onLoad();
       });

        divInfo.appendChild(pName);
        divInfo.appendChild(pSteps);
        divInfo.appendChild(pCalories);

        divBtnContainer.appendChild(changeBtn);
        divBtnContainer.appendChild(delBtn);

        li.appendChild(divInfo);
        li.appendChild(divBtnContainer);

        list.appendChild(li);

        editBtn.disabled = true;

    }
    
}


async function onAdd() {
    let name = nameInput.value;
    let steps = stepsInput.value;
    let calories = caloriesInput.value;

    if(!name || !steps || !calories) {
        return;
    }

    await addRecord(name, steps, calories);

    nameInput.value = '';
    stepsInput.value = '';
    caloriesInput.value = '';

    onLoad();
}


function onRecordEdit(r) {
    nameInput.value = r.name;
    stepsInput.value = r.steps;
    caloriesInput.value = r.calories;

    editBtn.dataset.id = r._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}


async function onEdit() {
    let name = nameInput.value;
    let steps = stepsInput.value;
    let calories = caloriesInput.value;
    let id = editBtn.dataset.id;

    if(!name || !steps || !calories) {
        return;
    }

    await updateRecord(name, steps, calories, id);

    nameInput.value = '';
    stepsInput.value = '';
    caloriesInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    onLoad();
}


// API Manipulations

async function loadRecords() {
    let res = await fetch(host);
    let data = await res.json();

    return Object.values(data);
}


async function addRecord(name, steps, calories) {
    let record = {
        name,
        steps,
        calories
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    }

    await fetch(host, options); 
}


async function updateRecord(name, steps, calories, _id) {
    let record = {
        name,
        steps,
        calories,
        _id
    }

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    }

    await fetch(host + _id, options); 
}


async function deleteRecord(id) {
    let options = {
        method: 'DELETE'
    }

    fetch(host + id, options);
}