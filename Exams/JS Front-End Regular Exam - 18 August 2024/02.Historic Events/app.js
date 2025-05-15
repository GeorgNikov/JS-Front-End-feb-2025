window.addEventListener("load", solve);

function solve() {
	// Взимаме референции към елементите от DOM
	let formElement = document.querySelector("form");
	let nameInput = document.getElementById("name");
	let timeInput = document.getElementById("time");
	let descriptionInput = document.getElementById("description");
	let addBtn = document.getElementById("add-btn");
	let previewList = document.getElementById("preview-list");
	let archiveList = document.getElementById("archive-list");

	// Добавяме слушател за натискане на бутона "Добави"
	addBtn.addEventListener("click", onAdd);

	function onAdd(ev) {
		// Стопира подаването на формуляра
		ev.preventDefault();

		// Взимаме и подрязваме стойностите от формата
        let nameElement = nameInput.value.trim();
        let timeElement = timeInput.value.trim();
        let descriptionElement = descriptionInput.value.trim();

        // Проверяваме дали всички полета са попълнени
        if (!nameElement || !timeElement || !descriptionElement) {
            return;
        }

		// Създаваме нов елемент <li>
		let li = document.createElement("li");
		let divBtn = document.createElement("div");
		let article = document.createElement("article");

        // Създаваме параграфи за име, дата и описание на събитието
        let nameP = document.createElement("p");
        nameP.textContent = `${nameElement}`;
        let timeP = document.createElement("p");
        timeP.textContent = `${timeElement}`;
        let descriptionP = document.createElement("p");
        descriptionP.textContent = `${descriptionElement}`;


        // Добавяме параграфите в article
        article.appendChild(nameP);
        article.appendChild(timeP);
        article.appendChild(descriptionP);
        

        // Добавяме клас на бутона
        divBtn.classList.add("buttons");

        // Създаваме бутон за редактиране
        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
		editButton.textContent = "Edit";
        editButton.addEventListener("click", () => edit(nameElement, timeElement, descriptionElement, li));

		// Създаваме бутон за запазване
		let saveButton = document.createElement("button");
		saveButton.classList.add("next-btn");
		saveButton.textContent = "Next";
		saveButton.addEventListener("click", () => onDone(li));

        // Добавяме бутоните в контейнера
        divBtn.appendChild(editButton);
        divBtn.appendChild(saveButton);

        // Добавяме article и бутони в <li>
        li.appendChild(article);
        li.appendChild(divBtn);

        // Добавяме <li> в списъка за проверка
        previewList.appendChild(li);
        formElement.reset(); // Нулираме формата

        // Забраняваме бутона
        addBtn.disabled = true;

	}

	function edit(nameElement, timeElement, descriptionElement, li) {
        // Възстановяваме стойностите в полетата за въвеждане
        nameInput.value = nameElement;
        timeInput.value = timeElement;
        descriptionInput.value = descriptionElement;

        // Премахваме елемента от списъка
        previewList.removeChild(li);

        // Разрешаваме бутона
        addBtn.disabled = false;
    }

	function onDone(listItem) {
        // Премахваме контейнера с бутоните
        let buttonDiv = listItem.querySelector(".buttons");
        buttonDiv.remove();

        // Създаваме бутон за изтриване
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("archive-btn");
		deleteButton.textContent = "Archive";
        deleteButton.addEventListener("click", () => onDelete(listItem));

        // Добавяме бутона за изтриване към елемента
        listItem.appendChild(deleteButton);

        // Премахваме елемента от списъка за преглед и го добавяме в списъка с архив
        previewList.removeChild(listItem);
        archiveList.appendChild(listItem);
    }

	function onDelete(listItem) {
        // Премахваме елемента от списъка с архив
        archiveList.removeChild(listItem);

        // Разрешаваме бутона
        addBtn.disabled = false;
    }

}
  