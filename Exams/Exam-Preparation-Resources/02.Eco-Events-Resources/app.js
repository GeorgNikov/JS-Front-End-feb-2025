window.addEventListener("load", solve);

function solve() {
	// Взимаме референции към елементите от DOM
	let formElement = document.querySelector(".registerEvent");
	let emailInput = document.getElementById("email");
	let eventInput = document.getElementById("event");
	let locationInput = document.getElementById("location");

	let addBtn = document.getElementById("next-btn");

	let previewList = document.getElementById("preview-list");
	let eventList = document.getElementById("event-list");

	// Добавяме слушател за натискане на бутона "Next"
	addBtn.addEventListener("click", onAdd);

	function onAdd(ev) {
		// Стопира подаването на формуляра
		ev.preventDefault();

		// Взимаме и подрязваме стойностите от формата
		let emailElement = emailInput.value.trim();
		let eventElement = eventInput.value.trim();
		let locationElement = locationInput.value.trim();

		// Проверяваме дали всички полета са попълнени
		if (!emailElement || !eventElement || !locationElement) {
			return;
		}

		// Създаваме нов елемент <li>
		let li = document.createElement("li");
		li.classList.add('application');
		let article = document.createElement("article");

		// Създаваме параграфи за име на лаптопа, сторидж и цена
		let emailH = document.createElement("h4");
		emailH.textContent = `${emailElement}`;
		let eventP = document.createElement("p");
		eventP.innerHTML = `<strong>Event:</strong><br>${eventElement}`;
		let locationP = document.createElement("p");
		locationP.innerHTML = `<strong>Location:</strong><br>${locationElement}`;

		// Добавяме параграфите в article
		article.appendChild(emailH);
		article.appendChild(eventP);
		article.appendChild(locationP);

		// Създаваме бутон за редактиране
		let editButton = document.createElement("button");
		editButton.classList.add("action-btn");
		editButton.classList.add("edit");
		editButton.textContent = "edit";
		editButton.addEventListener("click", () => edit(emailElement, eventElement, locationElement, li));

		// Създаваме бутон за запазване
		let saveButton = document.createElement("button");
		saveButton.classList.add("action-btn");
		saveButton.classList.add("apply");
		saveButton.textContent = "apply";
		saveButton.addEventListener("click", () => onDone(li, editButton, saveButton));

		// Добавям article в <li>
		li.appendChild(article);

		// Добавям бутоните в контейнера
		li.appendChild(editButton);
		li.appendChild(saveButton);

		// Добавям <li> в списъка за проверка
		previewList.appendChild(li);
		formElement.reset(); // Нулираме формата

		// Забранявам бутона
		addBtn.disabled = true;
	}

	function edit(emailElement, eventElement, locationElement, li) {
		// Възстановяваме стойностите в полетата за въвеждане
		emailInput.value = emailElement;
		eventInput.value = eventElement;
		locationInput.value = locationElement;

		// Премахваме елемента от списъка
		previewList.removeChild(li);

		// Разрешаваме бутона
		addBtn.disabled = false;
	}

	function onDone(listItem, editButton, saveButton) {
		// Премахваме елемента от списъка за преглед и го добавяме в списъка с евенти
		previewList.removeChild(listItem);
		eventList.appendChild(listItem);

		// Премахва бутоните
		listItem.removeChild(editButton);
		listItem.removeChild(saveButton);

		addBtn.disabled = false;
	}

}