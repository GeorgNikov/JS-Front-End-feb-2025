const url = 'http://localhost:3030/jsonstore/collections/students';
document.getElementById('submit').addEventListener('click', onCreate);
onLoad();


async function onLoad() {
    let students = await loadStudents();

    let list = document.querySelector('tbody');
    list.replaceChildren();

    for (let student of students) {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td>${student.facultyNumber}</td>
                        <td>${student.grade}</td>`;

        list.appendChild(tr);
    }
}


async function onCreate(ev) {
    ev.preventDefault();

    let form = document.getElementById('form');

    let firstNameInput = document.querySelector('[name="firstName"]');
    let lastNameInput = document.querySelector('[name="lastName"]');
    let facultyNumberInput = document.querySelector('[name="facultyNumber"]');
    let gradeInput = document.querySelector('[name="grade"]');

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let facultyNumber = facultyNumberInput.value;
    let grade = gradeInput.value;

    if (!firstName || !lastName || !facultyNumber || !grade) {
        return;
        console.log(grade)
    }

    await createStudent(firstName, lastName, facultyNumber, grade);

    onLoad();
    form.reset();
}


async function loadStudents() {
    let res = await fetch(url);
    let data = await res.json();

    return Object.values(data);
}

async function createStudent(firstName, lastName, facultyNumber, grade) {

    let students = { firstName, lastName, facultyNumber, grade };
    let options = {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(students)
    }

    await fetch(url, options);
}


