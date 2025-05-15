const BASE_URL = 'http://localhost:3030/jsonstore/records';

const endpoints = {
    update: (id) => `${BASE_URL}/${id}`,
    delete: (id) => `${BASE_URL}/${id}`,
};

const nameElement = document.getElementById("p-name");
const caloriesElement = document.getElementById("calories");
const stepsElement = document.getElementById("steps");

const recordsList = document.getElementById("records");
const list = document.getElementById('list');

const addBtn = document.getElementById("add-record");
const editBtn = document.getElementById("edit-record");
const loadBtn = document.getElementById("load-records");

let selectedTaskId = null;

function attachEvents() {
    loadBtn.addEventListener('click', loadBoardEventHandler);
    addBtn.addEventListener('click', createTaskEventHandler);
    editBtn.addEventListener('click', editTaskEventHandler);
}

function getIdByname(name) {
    return fetch(BASE_URL)
        .then(res => res.json())
        .then(res => Object.entries(res).find(e => e[1].name == name)[1]._id);
}

async function loadBoardEventHandler() {
    clearAllSections();
    try {
        const res = await fetch(BASE_URL);
        const allnames = await res.json();
        Object.values(allnames).forEach((name) => {
            const container = document.createElement('div');
            container.className = 'record';

            const content = document.createElement('div');
            content.className = 'info';

            const nameElement = document.createElement('p');
            nameElement.textContent = name.name;

            const caloriesElement = document.createElement('p');
            caloriesElement.textContent = name.calories;

            const stepsElement = document.createElement('p');
            stepsElement.textContent = name.steps;
           

            const buttonsContainer = document.createElement('div'); 
            buttonsContainer.className = 'btn-wrapper';

            const changeBtn = document.createElement('button');
            changeBtn.className = 'change-btn';
            changeBtn.textContent = 'Change';

            const doneBtn = document.createElement('button');
            doneBtn.className = 'delete-btn';
            doneBtn.textContent = 'Delete';

            buttonsContainer.appendChild(changeBtn); 
            buttonsContainer.appendChild(doneBtn);

            content.appendChild(nameElement);
            content.appendChild(stepsElement);
            content.appendChild(caloriesElement);
            

            container.appendChild(content);
            container.appendChild(buttonsContainer); 

            list.appendChild(container);
        });
        attachEventListeners();
    } catch (err) {
        console.error(err);
    }
}

function attachEventListeners() {
    const changeButtons = document.querySelectorAll('.change-btn');
    const doneButtons = document.querySelectorAll('.delete-btn');

    changeButtons.forEach((changeButton) => {
        changeButton.addEventListener('click', (event) => {
            const taskElement = event.target.closest('.record');
            const name = taskElement.querySelector('p').textContent;
            const steps = taskElement.querySelector('p:nth-child(2)').textContent;
            const calories = taskElement.querySelector('p:nth-child(3)').textContent;
            editTask(name, calories, steps);
            enableEditBtn();
        });
    });
    

    doneButtons.forEach((doneButton) => {
        doneButton.addEventListener('click', (event) => {
            const taskElement = event.target.closest('.record');
            const name = taskElement.querySelector('p').textContent;
            deleteTask(name);
        });
    });
    
}

function enableEditBtn() {
    addBtn.disabled = true;
    editBtn.disabled = false;
}

function enableAddBtn() {
    addBtn.disabled = false;
    editBtn.disabled = true;
}

function createTaskEventHandler(ev) {
    ev.preventDefault();
    if (nameElement.value !== '' && stepsElement.value !== '' && caloriesElement.value !== '') {
        const headers = {
            method: 'POST',
            body: JSON.stringify({
                name: nameElement.value,
                steps: stepsElement.value,
                calories: caloriesElement.value,
            }),
        };

        fetch(BASE_URL, headers)
            .then(loadBoardEventHandler)
            .catch(console.error);

        clearAllInputs();
    }
}

async function editTask(name, calories, steps) {
    selectedTaskId = await getIdByname(name);
    nameElement.value = name;
    caloriesElement.value = calories;
    stepsElement.value = steps;
}

function editTaskEventHandler(ev) {
    ev.preventDefault();
    const data = {
        name: nameElement.value,
        steps: stepsElement.value,
        calories: caloriesElement.value,
        _id: selectedTaskId,
    };

    fetch(endpoints.update(data._id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            clearAllInputs();
            loadBoardEventHandler();
            selectedTaskId = null;
            enableAddBtn();
        })
        .catch(console.error);
}

function deleteTask(taskLoacation) {
    getIdByname(taskLoacation)
        .then((id) =>
            fetch(endpoints.delete(id), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
        )
        .then(() => {
            clearAllSections();
            loadBoardEventHandler();
            selectedTaskId = null;
            enableAddBtn();
        })
        .catch(console.error);
}

function clearAllSections() {
    list.innerHTML = '';
}

function clearAllInputs() {
    nameElement.value = '';
    stepsElement.value = '';
    caloriesElement.value = '';
}

attachEvents();
