window.addEventListener("load", solve);

function solve() {
	// Взимаме референции към елементите от DOM
	let formElement = document.querySelector("form");
	let nameInput = document.getElementById("laptop-model");
	let storageInput = document.getElementById("storage");
	let priceInput = document.getElementById("price");

	let addBtn = document.getElementById("add-btn");
    let clearBtn = document.querySelector(".clear")

	let previewList = document.getElementById("check-list");
	let laptopList = document.getElementById("laptops-list");

	// Добавяме слушател за натискане на бутона "Добави"
	addBtn.addEventListener("click", onAdd);

	function onAdd(ev) {
		// Стопира подаването на формуляра
		ev.preventDefault();

		// Взимаме и подрязваме стойностите от формата
        let nameElement = nameInput.value.trim();
        let storageElement = storageInput.value.trim();
        let priceElement = priceInput.value.trim();

        // Проверяваме дали всички полета са попълнени
        if (!nameElement || !storageElement || !priceElement) {
            return;
        }

		// Създаваме нов елемент <li>
		let li = document.createElement("li");
		let article = document.createElement("article");

        li.classList.add("laptop-item");

        // Създаваме параграфи за име на лаптопа, сторидж и цена
        let nameP = document.createElement("p");
        nameP.textContent = `${nameElement}`;
        let storageP = document.createElement("p");
        storageP.textContent = `Memory: ${storageElement} TB`;
        let priceP = document.createElement("p");
        priceP.textContent = `Price: ${priceElement}$`;

        // Добавяме параграфите в article
        article.appendChild(nameP);
        article.appendChild(storageP);
        article.appendChild(priceP);      

        // Създаваме бутон за редактиране
        let editButton = document.createElement("button");
        editButton.classList.add("btn");
        editButton.classList.add("edit");
		editButton.textContent = "edit";
        editButton.addEventListener("click", () => edit(nameElement, storageElement, priceElement, li));

		// Създаваме бутон за запазване
		let saveButton = document.createElement("button");
		saveButton.classList.add("btn");
        saveButton.classList.add("ok");
		saveButton.textContent = "ok";
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

	function edit(nameElement, storageElement, priceElement, li) {
        // Възстановяваме стойностите в полетата за въвеждане
        nameInput.value = nameElement;
        storageInput.value = storageElement;
        priceInput.value = priceElement;

        // Премахваме елемента от списъка
        previewList.removeChild(li);

        // Разрешаваме бутона
        addBtn.disabled = false;
    }

	function onDone(listItem, editButton, saveButton) {
        // Взимам бутона clear
        clearBtn.addEventListener("click", () => onDelete());
        
        // Премахваме елемента от списъка за преглед и го добавям в списъка с архив
        previewList.removeChild(listItem);
        laptopList.appendChild(listItem);

        // Премахва бутоните
        listItem.removeChild(editButton);
        listItem.removeChild(saveButton);

        addBtn.disabled = false;
  
    }

	function onDelete() {
        // Презареждане на страницата
        location.reload();
    }

}


// EDGE CASE: 
// Бутона забранен/разрешен
// Добавяне на знак след цена и сторидж
// Етикети преди сторидж и цена
// 
  