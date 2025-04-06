let url = 'http://localhost:3030/jsonstore/phonebook/';

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
}

attachEvents();


async function onLoad() {
    let phones = await getPhones();

    let list = document.getElementById('phonebook');
    list.replaceChildren();

    for (let phone of phones) {
        let li = document.createElement('li');

        li.append(`${phone.person}: ${phone.phone}`);

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => onDelete(li, phone._id))
        // delBtn.value = phone._id

        li.appendChild(delBtn);
        list.appendChild(li)
    }
}

async function onCreate() {
    let personInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');

    let person = personInput.value;
    let phone = phoneInput.value;

    if (!person || !phone) {
        return;
    }

    await postPhones(person, phone);

    personInput.value = '';
    phoneInput.value = '';

    onLoad();
}

async function onDelete(li, phoneId) {
    await deletePhone(phoneId);
    li.remove();
}


async function getPhones() {
    let res = await fetch(url);
    let data = await res.json();

    return Object.values(data);
}


async function postPhones(person, phone) {
    let message = { person, phone };
    let options = {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    }

    await fetch(url, options);
}


async function deletePhone(phoneId) {
    let options = {
        method: 'DELETE',
    }

    await fetch(url + phoneId, options);
}