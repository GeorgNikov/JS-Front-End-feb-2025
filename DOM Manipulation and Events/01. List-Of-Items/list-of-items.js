function addItem() {
    let input = document.getElementById('newItemText');
    let text = input.value;

    if (!text) {
        return;
    }

    let newLi = document.createElement('li');
    newLi.textContent = text;

    let list = document.getElementById('items');
    list.appendChild(newLi);

    input.value = ''
}
