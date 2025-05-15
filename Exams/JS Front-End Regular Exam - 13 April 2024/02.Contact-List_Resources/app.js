window.addEventListener("load", solve);


function solve() {
    let formElement = document.querySelector("form");
    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let categoryInput = document.getElementById("category");
    let addBtn = document.getElementById("add-btn");
    let checkList = document.getElementById("check-list");
    let contactList = document.getElementById("contact-list");

    addBtn.addEventListener("click", addOnClick);

    function addOnClick() {
        let name = nameInput.value.trim();
        let phone = phoneInput.value.trim();
        let category = categoryInput.value.trim();

        if (!name || !phone || !category) {
            return;
        }

        let newLi = document.createElement("li");
        let buttonDiv = document.createElement("div");
        let newArticle = document.createElement("article");

        let nameP = document.createElement("p");
        nameP.textContent = `name:${name}`;
        let phoneP = document.createElement("p");
        phoneP.textContent = `phone:${phone}`;
        let categoryP = document.createElement("p");
        categoryP.textContent = `category:${category}`;

        newArticle.appendChild(nameP);
        newArticle.appendChild(phoneP);
        newArticle.appendChild(categoryP);

        buttonDiv.classList.add("buttons");

        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => edit(name, phone, category, newLi));

        let saveButton = document.createElement("button");
        saveButton.classList.add("save-btn");
        saveButton.addEventListener("click", () => saveContact(newLi));

        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(saveButton);

        newLi.appendChild(newArticle);
        newLi.appendChild(buttonDiv);

        checkList.appendChild(newLi);
        formElement.reset();
    }

    function edit(name, phone, category, listItem) {
        nameInput.value = name;
        phoneInput.value = phone;
        categoryInput.value = category;

        checkList.removeChild(listItem);
    }

    function saveContact(listItem) {
        let buttonDiv = listItem.querySelector(".buttons");
        buttonDiv.remove();

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("del-btn");
        deleteButton.addEventListener("click", () => deleteContact(listItem));

        listItem.appendChild(deleteButton);

        checkList.removeChild(listItem);
        contactList.appendChild(listItem);
    }

    function deleteContact(listItem) {
        contactList.removeChild(listItem);
    }
}

