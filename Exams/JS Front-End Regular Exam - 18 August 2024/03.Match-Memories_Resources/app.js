const baseURL = 'http://localhost:3030/jsonstore/matches/';

// input fields
let hostInput = document.getElementById('host');
let scoreInput = document.getElementById('score');
let guestInput = document.getElementById('guest');

// Buttons
let loadBtn = document.getElementById('load-matches');
let addBtn = document.getElementById('add-match');
let editBtn = document.getElementById('edit-match');

// Ebent listeners
loadBtn.addEventListener('click', loadMatches);
addBtn.addEventListener('click', () => onAdd());
editBtn.addEventListener('click', () => onEdit());

// DOM Manipulation
async function loadMatches() {
    let list = document.getElementById('list');
    list.innerHTML = '';

    // Geting all matches
    let matchess = await getMatches();

    for (let match of matchess) {
        // Create li element
        let li = document.createElement('li');
        li.className = 'match';

        // Create div element
        let div = document.createElement('div');
        div.className = 'info';

        // Create p elements
        let pName = document.createElement('p');
        let pSteps = document.createElement('p');
        let pCalories = document.createElement('p');

        pName.textContent = match.host;
        pSteps.textContent = match.score;
        pCalories.textContent = match.guest;

        div.appendChild(pName);
        div.appendChild(pSteps);
        div.appendChild(pCalories);
        li.appendChild(div);

        // Create div element
        let divWrapper = document.createElement('div');
        divWrapper.className = 'btn-wrapper';

        // Create change button and add event listener
        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-btn';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => onRecordEdit(match, li));

        // Create delete button and add event listener
        let delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', async () => {
             deleteMatch(match._id);    // Delete match -> API
             loadMatches(); // Load all matches
        });

        divWrapper.appendChild(changeBtn);
        divWrapper.appendChild(delBtn);
        li.appendChild(divWrapper);
        list.appendChild(li);
    }

    editBtn.disabled = true;
}


async function onRecordEdit(match, li) {
    li.remove();

    hostInput.value = match.host;
    scoreInput.value = match.score;
    guestInput.value = match.guest;

    editBtn.dataset.id = match._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}

async function onAdd() {
    let host = hostInput.value;
    let score = scoreInput.value;
    let guest = guestInput.value;

    if(!host || !score || !guest) {
        return;
    }

    await addMatch(host, score, guest);

    hostInput.value = '';
    scoreInput.value = '';
    guestInput.value = '';

    loadMatches();
}


async function onEdit() {
    let host = hostInput.value;
    let score = scoreInput.value;
    let guest = guestInput.value;
    let id = editBtn.dataset.id;

    if(!host || !score || !guest) {
        return;
    }

    await updateMatch(host, score, guest, id);

    hostInput.value = '';
    scoreInput.value = '';
    guestInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    loadMatches();   
}


// API
async function getMatches() {
    let res = await fetch(baseURL);

    if (res.status == 204) {
        return []
    }

    let data = await res.json();
    return Object.values(data);
}


async function addMatch(host, score, guest) {
    let record = {
        host,
        score,
        guest
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    };

    await fetch(baseURL, options);
}

async function updateMatch(host, score, guest, _id) {
    let data = {
        host,
        score,
        guest,
        _id
    }

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    await fetch(baseURL + _id, options)
}

async function deleteMatch(id) {
    let options = {
        method: 'DELETE'
    };

    await fetch(baseURL + id, options);
}