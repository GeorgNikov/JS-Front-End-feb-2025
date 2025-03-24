function deleteByEmail() {
    let input = document.querySelector('[name="email"]');
    let pattern = input.value;
    let deleted = false;

    if (!pattern) {
        return;
    }

    let rows = Array.from(document.querySelectorAll('tbody tr'));

    for (let row of rows) {
        let emailCol = row.children[1];
        let email = emailCol.textContent;

        if (email.includes(pattern)) {
            row.remove();
            deleted = true;
            
        }
    }

    let output = document.getElementById('result');

    if (deleted) {
        output.textContent = 'Deleted.'
        input.value = '';
    } else {
        output.textContent = 'Not found.'
    } 

}
