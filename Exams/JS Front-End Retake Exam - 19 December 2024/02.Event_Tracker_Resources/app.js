window.addEventListener("load", solve);

function solve(){

    let form = document.querySelector('form');
    let eventInput = document.getElementById('event')
    let noteInput = document.getElementById('note')
    let dateInput = document.getElementById('date')

    let upcomingList = document.getElementById('upcoming-list');
    let eventList = document.getElementById('events-list');

    let btnSave = document.getElementById('save');
    btnSave.addEventListener('click', (ev) => {
        ev.preventDefault();
        onAdd();
    });

    let delBtn = document.querySelector('.btn.delete');
    delBtn.addEventListener('click', onDelete);



    function onAdd() {
        //upcomingList.replaceChildren();

        
        let event = eventInput.value;
        let note = noteInput.value;
        let date = dateInput.value;

        if (!event || !note || !date) {
            console.warn("Някое поле е празно!");
            return;
        }

        let li = document.createElement('li');
        li.className = 'event-item';

        let divContainer = document.createElement('div');
        divContainer.className = 'event-container';

        let article = document.createElement('article');

        let pEvent = document.createElement('p');
        pEvent.textContent = `Name: ${event}`;

        let pNote = document.createElement('p');
        pNote.textContent = `Note: ${note}`;

        let pDate = document.createElement('p');
        pDate.textContent = `Date: ${date}`;

        // Append elements to article
        article.appendChild(pEvent);
        article.appendChild(pNote);
        article.appendChild(pDate);

        divContainer.append(article);

        let divButtons = document.createElement('div');
        divButtons.className = 'buttons';

        let editBtn = document.createElement('button');
        editBtn.className = 'btn edit';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => onEdit(event, note, date, li));

        let doneBtn = document.createElement('button');
        doneBtn.className = 'btn done';
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', () => onDone(li, article));

        // Append buttons to div
        divButtons.appendChild(editBtn);
        divButtons.appendChild(doneBtn);

        // Append elements to list

        li.appendChild(divContainer);
        divContainer.appendChild(divButtons);

        upcomingList.appendChild(li)

        form.reset();
    }

    function onEdit(event, note, date, li) {
        eventInput.value = event;
        noteInput.value = note;
        dateInput.value = date;

        upcomingList.removeChild(li);
    }

    function onDone(li, article) {
        li.replaceChildren(article);
        upcomingList.removeChild(li);
        eventList.appendChild(li);
    }

    function onDelete() {
        eventList.remove();
    }
}
