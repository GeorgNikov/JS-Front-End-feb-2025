window.addEventListener("load", solve);

function solve() {
	// Взимаме референции към елементите от DOM
	let formElement = document.querySelector("form");
	let typeInput = document.getElementById("type");
	let ageInput = document.getElementById("age");
	let genderInput = document.getElementById("gender");
	let adoptBtn = document.getElementById("adopt-btn");
	let adoptionInfo = document.getElementById("adoption-info");
	let adoptedPets = document.getElementById("adopted-list");

	// Добавяме слушател за натискане на бутона "Добави"
	adoptBtn.addEventListener("click", onAdd);

	function onAdd(ev) {
		// Стопира подаването на формуляра
		ev.preventDefault();

		// Взимаме и подрязваме стойностите от формата
        let typeElement = typeInput.value.trim();
        let ageElement = ageInput.value.trim();
        let genderElement = genderInput.value.trim();

        // Проверяваме дали всички полета са попълнени
        if (!typeElement || !ageElement || !genderElement) {
            return;
        }

		// Създаваме нов елемент <li>
		let li = document.createElement("li");
		let divBtn = document.createElement("div");
		let article = document.createElement("article");

        // Създаваме параграфи за тъп, години и пол
        let typeP = document.createElement("p");
        typeP.textContent = `Pet:${typeElement}`;
        let genderP = document.createElement("p");
        genderP.textContent = `Gender:${genderElement}`;
        let ageP = document.createElement("p");
        ageP.textContent = `Age:${ageElement}`;

        // Добавяме параграфите в article
        article.appendChild(typeP);
        article.appendChild(genderP);
        article.appendChild(ageP);

        // Добавяме клас на бутона
        divBtn.classList.add("buttons");

        // Създаваме бутон за редактиране
        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
		editButton.textContent = "Edit";
        editButton.addEventListener("click", () => edit(typeElement, genderElement, ageElement, li));

		// Създаваме бутон за запазване
		let saveButton = document.createElement("button");
		saveButton.classList.add("done-btn");
		saveButton.textContent = "Done";
		saveButton.addEventListener("click", () => onDone(li));

        // Добавяме бутоните в контейнера
        divBtn.appendChild(editButton);
        divBtn.appendChild(saveButton);

        // Добавяме article и бутони в <li>
        li.appendChild(article);
        li.appendChild(divBtn);

        // Добавяме <li> в списъка за проверка
        adoptionInfo.appendChild(li);
        formElement.reset(); // Нулираме формата

	}

	function edit(typeElement, genderElement, ageElement, li) {
        // Възстановяваме стойностите в полетата за въвеждане
        typeInput.value = typeElement;
        genderInput.value = genderElement;
        ageInput.value = ageElement;

        // Премахваме елемента от списъка
        adoptionInfo.removeChild(li);
    }

	function onDone(listItem) {
        // Премахваме контейнера с бутоните
        let buttonDiv = listItem.querySelector(".buttons");
        buttonDiv.remove();

        // Създаваме бутон за изтриване
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("clear-btn");
		deleteButton.textContent = "Clear";
        deleteButton.addEventListener("click", () => onDelete(listItem));

        // Добавяме бутона за изтриване към елемента
        listItem.appendChild(deleteButton);

        // Премахваме елемента от списъка за проверка и го добавяме в осиновени животни
        adoptionInfo.removeChild(listItem);
        adoptedPets.appendChild(listItem);
    }

	function onDelete(listItem) {
        // Премахваме елемента от списъка с осиновени животни
        adoptedPets.removeChild(listItem);
    }

}
  