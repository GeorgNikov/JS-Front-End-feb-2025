let host = 'http://localhost:3030/jsonstore/tasks';

// Form and input fiels
let form = document.querySelector('form');
let foodInput = document.getElementById('food');
let timeInput = document.getElementById('time');
let caloriesInput = document.getElementById('calories');

// List 
let list = document.getElementById('list');

// Buttons
let loadBtn = document.getElementById('load-meals');
let addBtn = document.getElementById('add-meal');
let editBtn = document.getElementById('edit-meal');

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
    let meals = await loadMeals();

    for (let meal of meals) {
        let divMeal = document.createElement('div');
        divMeal.className = 'meal';

        let hFood = document.createElement('h2');
        hFood.textContent = meal.food;

        let hTime = document.createElement('h3');
        hTime.textContent = meal.time;

        let hCalories = document.createElement('h3');
        hCalories.textContent = meal.calories;

        divMeal.appendChild(hFood)
        divMeal.appendChild(hTime)
        divMeal.appendChild(hCalories)

        let divButtons = document.createElement('div');
        divButtons.className = 'meal-buttons';

        let changeBtn = document.createElement('button');
        changeBtn.className = 'change-meal';
        changeBtn.textContent = 'Change';
        changeBtn.addEventListener('click', () => {
            onOrderEdit(meal)
            onLoad();
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-meal';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteMeal(meal._id)
            onLoad();
        });

        // Append elements to list
        divButtons.appendChild(changeBtn);
        divButtons.appendChild(deleteBtn);

        divMeal.appendChild(divButtons);
        list.appendChild(divMeal)
    }
    
}

// Add
async function onAdd() {
    let food = foodInput.value;
    let calories = caloriesInput.value;
    let time = timeInput.value;

    if (!food || !calories || !time) {
        return;
    }

    await addMeal(food, calories, time)

    form.reset();
    onLoad();
}

// Edit form
function onOrderEdit(meal) {
    foodInput.value = meal.food;
    timeInput.value = meal.time;
    caloriesInput.value = meal.calories;
    editBtn.dataset.id = meal._id;

    addBtn.disabled = true;
    editBtn.disabled = false;    
}

// Edit
async function onEdit() {
    let food = foodInput.value;
    let time = timeInput.value;
    let calories = caloriesInput.value;
    let id = editBtn.dataset.id;

    await updateMeal(food, calories, time, id);

    addBtn.disabled = false;
    editBtn.disabled = true;     

    form.reset();
    onLoad();
}


// API Manipulation
// Load
async function loadMeals() {
    let res = await fetch(host);

    if (!res.status == 204) {
        return [];
    }

    let data = await res.json();

    return Object.values(data);
}

// Add
async function addMeal(food, calories, time) {
    let order = {
        food,
        calories,
        time
    }

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }

    await fetch(host, options);
}

// Update
async function updateMeal(food, calories, time, _id) {
    let order = {
        food,
        calories,
        time,
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
async function deleteMeal(id) {
    await fetch(`${host}/${id}`, { method: 'DELETE' })
}