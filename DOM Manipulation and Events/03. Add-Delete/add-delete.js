function addItem() {
    let input = document.getElementById('newItemText');
    let text = input.value;

    if (!text) {
        return;
    }

    let newLi = document.createElement('li');

    newLi.innerHTML = `${text}<a href="#">[Delete]</a>`;
    newLi.querySelector('a').addEventListener('click', () => {
        newLi.remove();
    })

    let list = document.getElementById('items');
    list.appendChild(newLi);

    input.value = ''

}
