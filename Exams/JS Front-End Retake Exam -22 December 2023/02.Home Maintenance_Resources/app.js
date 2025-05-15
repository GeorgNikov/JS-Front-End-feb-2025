window.addEventListener("load", solve);

function solve() {
	// Взимаме референции към елементите от DOM
	let formElement = document.querySelector("form");
	let placeInput = document.getElementById("place");
	let actionInput = document.getElementById("action");
	let personInput = document.getElementById("person");
	let addBtn = document.getElementById("add-btn");
	let taskList = document.getElementById("task-list");
	let doneList = document.getElementById("done-list");

	// Добавяме слушател за натискане на бутона "Добави"
	addBtn.addEventListener("click", onAdd);

	function onAdd(ev) {
		// Стопира подаването на формуляра
		ev.preventDefault();

		// Взимаме и подрязваме стойностите от формата
        let placeElement = placeInput.value.trim();
        let actionElement = actionInput.value.trim();
        let personElement = personInput.value.trim();

        // Проверяваме дали всички полета са попълнени
        if (!placeElement || !actionElement || !personElement) {
            return;
        }

		// Създаваме нов елемент <li>
		let li = document.createElement("li");
		let divBtn = document.createElement("div");
		let article = document.createElement("article");

        li.classList.add('clean-task')

        // Създаваме параграфи за място, действие и личност
        let placeP = document.createElement("p");
        placeP.textContent = `Place:${placeElement}`;
        let actionP = document.createElement("p");
        actionP.textContent = `Action:${actionElement}`;
        let personP = document.createElement("p");
        personP.textContent = `Person:${personElement}`;

        // Добавяме параграфите в article
        article.appendChild(placeP);
        article.appendChild(actionP);
        article.appendChild(personP);

        // Добавяме клас на бутона
        divBtn.classList.add("buttons");

        // Създаваме бутон за редактиране
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
		editButton.textContent = "Edit";
        editButton.addEventListener("click", () => edit(placeElement, actionElement, personElement, li));

		// Създаваме бутон за запазване
		let saveButton = document.createElement("button");
		saveButton.classList.add("done");
		saveButton.textContent = "Done";
		saveButton.addEventListener("click", () => onDone(li));

        // Добавяме бутоните в контейнера
        divBtn.appendChild(editButton);
        divBtn.appendChild(saveButton);

        // Добавяме article и бутони в <li>
        li.appendChild(article);
        li.appendChild(divBtn);

        // Добавяме <li> в списъка за проверка
        taskList.appendChild(li);
        formElement.reset(); // Нулираме формата

	}

	function edit(placeElement, actionElement, personElement, li) {
        // Възстановяваме стойностите в полетата за въвеждане
        placeInput.value = placeElement;
        actionInput.value = actionElement;
        personInput.value = personElement;

        // Премахваме елемента от списъка
        taskList.removeChild(li);
    }

	function onDone(listItem) {
        // Премахваме контейнера с бутоните
        let buttonDiv = listItem.querySelector(".buttons");
        buttonDiv.remove();

        // Създаваме бутон за изтриване
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
		deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => onDelete(listItem));

        // Добавяме бутона за изтриване към елемента
        listItem.appendChild(deleteButton);

        // Премахвам класа от ли елемента
        listItem.classList.remove('clean-task')

        // Премахваме елемента от списъка за проверка и го добавяме
        taskList.removeChild(listItem);
        doneList.appendChild(listItem);
    }

	function onDelete(listItem) {
        // Премахваме елемента от списъка
        doneList.removeChild(listItem);
    }

}
  