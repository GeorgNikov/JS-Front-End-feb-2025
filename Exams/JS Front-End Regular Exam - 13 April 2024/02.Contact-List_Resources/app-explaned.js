window.addEventListener("load", solve);

function solve() {
    // Взимаме референции към елементите от DOM
    let formElement = document.querySelector("form");
    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let categoryInput = document.getElementById("category");
    let addBtn = document.getElementById("add-btn");
    let checkList = document.getElementById("check-list");
    let contactList = document.getElementById("contact-list");

    // Добавяме слушател за натискане на бутона
    addBtn.addEventListener("click", addOnClick);

    function addOnClick() {
        // Взимаме стойностите от формата
        let name = nameInput.value.trim();
        let phone = phoneInput.value.trim();
        let category = categoryInput.value.trim();

        // Проверяваме дали всички полета са попълнени
        if (!name || !phone || !category) {
            return;
        }

        // Създаваме нов елемент <li>
        let newLi = document.createElement("li");
        let buttonDiv = document.createElement("div");
        let newArticle = document.createElement("article");

        // Създаваме параграфи за име, телефон и категория
        let nameP = document.createElement("p");
        nameP.textContent = `name:${name}`;
        let phoneP = document.createElement("p");
        phoneP.textContent = `phone:${phone}`;
        let categoryP = document.createElement("p");
        categoryP.textContent = `category:${category}`;

        // Добавяме параграфите в article
        newArticle.appendChild(nameP);
        newArticle.appendChild(phoneP);
        newArticle.appendChild(categoryP);

        // Добавяме клас на бутона
        buttonDiv.classList.add("buttons");

        // Създаваме бутон за редактиране
        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => edit(name, phone, category, newLi));

        // Създаваме бутон за запазване
        let saveButton = document.createElement("button");
        saveButton.classList.add("save-btn");
        saveButton.addEventListener("click", () => saveContact(newLi));

        // Добавяме бутоните в контейнера
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(saveButton);

        // Добавяме article и бутони в <li>
        newLi.appendChild(newArticle);
        newLi.appendChild(buttonDiv);

        // Добавяме <li> в списъка за проверка
        checkList.appendChild(newLi);
        formElement.reset(); // Нулираме формата
    }

    function edit(name, phone, category, listItem) {
        // Възстановяваме стойностите в полетата за въвеждане
        nameInput.value = name;
        phoneInput.value = phone;
        categoryInput.value = category;

        // Премахваме елемента от списъка
        checkList.removeChild(listItem);
    }

    function saveContact(listItem) {
        // Премахваме контейнера с бутоните
        let buttonDiv = listItem.querySelector(".buttons");
        buttonDiv.remove();

        // Създаваме бутон за изтриване
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("del-btn");
        deleteButton.addEventListener("click", () => deleteContact(listItem));

        // Добавяме бутона за изтриване към елемента
        listItem.appendChild(deleteButton);

        // Премахваме елемента от списъка за проверка и го добавяме в контактите
        checkList.removeChild(listItem);
        contactList.appendChild(listItem);
    }

    function deleteContact(listItem) {
        // Премахваме елемента от списъка с контакти
        contactList.removeChild(listItem);
    }
}
