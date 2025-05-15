window.addEventListener('load', solve);

function solve() {

    // Form and form input fields
    let form = document.querySelector('form');
    let firstNameInput = document.getElementById('first_name')
    let lastNameInput = document.getElementById('last_name')
    let phoneInput = document.getElementById('phone')

    // Lists
    let pendingList = document.getElementById('pending_contact_list');
    let verifiedList = document.getElementById('contact_list');

    // Buttons and Event listeners
    let addBtn = document.getElementById('add_btn');
    addBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        onAdd();
    });

    // let delBtn = document.querySelector('.btn.delete');
    // delBtn.addEventListener('click', onDelete);


    // Add
    function onAdd() {
        pendingList.replaceChildren();

        let firstName = firstNameInput.value;
        let lastName = lastNameInput.value;
        let phone = phoneInput.value;

        if (!firstName || !lastName || !phone) {
            return;
        }

        let li = document.createElement('li');
        li.className = 'contact';

        let spanName = document.createElement('span');
        spanName.className = 'names';
        spanName.textContent = `${firstName} ${lastName}`;

        let spanPhone = document.createElement('span');
        spanPhone.className = 'phone_number';
        spanPhone.textContent = `${phone}`;

        // Append elements to article
        li.appendChild(spanName);
        li.appendChild(spanPhone);

        let editBtn = document.createElement('button');
        editBtn.className = 'edit_btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => onEdit(firstName, lastName, phone, li));

        let doneBtn = document.createElement('button');
        doneBtn.className = 'verify_btn';
        doneBtn.textContent = 'Verify';
        doneBtn.addEventListener('click', () => onDone(li, spanName, spanPhone));

        // Append buttons to li
        li.appendChild(editBtn);
        li.appendChild(doneBtn);

        pendingList.appendChild(li)

        form.reset();
    }

    function onEdit(firstName, latName, phone, li) {
        li.remove();

        firstNameInput.value = firstName;
        lastNameInput.value = latName;
        phoneInput.value = phone;

        upcomingList.removeChild(li);
    }

    function onDone(li, spanName, spanPhone) {
        verifiedList.replaceChildren();
        pendingList.removeChild(li);

        let newLi = document.createElement('li');
        newLi.className = 'verified_contact';

        let delBtn = document.createElement('button');
        delBtn.className = 'delete_btn';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => onDelete())

        newLi.appendChild(spanName);
        newLi.appendChild(spanPhone);
        newLi.appendChild(delBtn);

        verifiedList.appendChild(newLi);
    }

    function onDelete() {
        verifiedList.remove();
    }
}
