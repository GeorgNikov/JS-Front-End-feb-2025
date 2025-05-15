document.getElementById('load-records').addEventListener('click', loadRecords);

// Form input fields
const nameInput = document.getElementById('p-name');
const stepsInput = document.getElementById('steps');
const caloriesInput = document.getElementById('calories');

// Buttons
const addBtn = document.getElementById('add-record');
const editBtn = document.getElementById('edit-record');

// Event listeners
addBtn.addEventListener('click', addRecord);


// DOM Manipulation
async function loadRecords() {
    let list = document.getElementById('list');
    list.innerHTML = '';

    let records = await getRecords();

    for (let record of records) {
        let li = document.createElement('li');
        li.className = 'record';

        let div = document.createElement('div');
        div.className = 'info';

        let pName = document.createElement('p');
        let pSteps = document.createElement('p');
        let pCalories = document.createElement('p');
        pName.textContent = record.name;
        pSteps.textContent = record.steps;
        pCalories.textContent = record.calories;

        div.appendChild(pName);
        div.appendChild(pSteps);
        div.appendChild(pCalories);
        li.appendChild(div);

        let divWrapper = document.createElement('div');
        divWrapper.className = 'btn-wrapper';

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => changeRecord(record._id, record.name, record.steps, record.calories));

        let delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => deleteRecord(record._id));

        divWrapper.appendChild(changeBtn);
        divWrapper.appendChild(delBtn);
        li.appendChild(divWrapper);
        list.appendChild(li);
    }

    editBtn.disabled = true;
    addBtn.disabled = false;
}

async function addRecord(ev) {
    ev.preventDefault();

    let name = nameInput.value.trim();
    let steps = stepsInput.value.trim();
    let calories = caloriesInput.value.trim();

    if (!name || !steps || !calories) return;

    await postRecord(name, steps, calories);

    nameInput.value = '';
    stepsInput.value = '';
    caloriesInput.value = '';
}

async function changeRecord(id, name, steps, calories) {
    currentEditId = id;
    nameInput.value = name;
    stepsInput.value = steps;
    caloriesInput.value = calories;

    editBtn.disabled = false;
    addBtn.disabled = true;
}

editBtn.addEventListener('click', async () => {
    if (!currentEditId) return;

    let name = nameInput.value.trim();
    let steps = stepsInput.value.trim();
    let calories = caloriesInput.value.trim();

    if (!name || !steps || !calories) return;

    await putRecord(currentEditId, name, steps, calories);

    nameInput.value = '';
    stepsInput.value = '';
    caloriesInput.value = '';

    currentEditId = null;
    editBtn.disabled = true;
    addBtn.disabled = false;
    await loadRecords();
});

async function postRecord(name, steps, calories) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, steps, calories })
    };

    let res = await fetch('http://localhost:3030/jsonstore/records', options);
    if (!res.ok) throw new Error('Failed to add record');

    await loadRecords();
}

async function putRecord(id, name, steps, calories) {
    ev.preventDefault();
    id = await getIdByname(name);
    const data = {
        name: nameInput.value,
        steps: stepsInput.value,
        calories: caloriesInput.value,
        _id: id,
    };

    console.log(id)
    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    let res = await fetch('http://localhost:3030/jsonstore/records/' + id, options);
    if (!res.ok) throw new Error('Failed to update record');
}

async function getRecords() {
    let res = await fetch('http://localhost:3030/jsonstore/records');
    let data = await res.json();
    return Object.values(data);
}

async function deleteRecord(id) {
    let options = { method: 'DELETE' };

    let res = await fetch('http://localhost:3030/jsonstore/records/' + id, options);
    if (!res.ok) throw new Error('Failed to delete record');

    await loadRecords();
}


async function getIdByname(name) {
    let res = await fetch('http://localhost:3030/jsonstore/records');
    let data = await res.json();

    for (let d of data) {
        if (d.name = name) {
            return d._id
        }
    }
}
