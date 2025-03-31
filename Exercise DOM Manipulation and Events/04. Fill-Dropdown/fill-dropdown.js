document.addEventListener('DOMContentLoaded', solve);

function solve() {
    let form = document.querySelector('form');
    let select = document.getElementById('menu');

    document.querySelector('[type="submit"]').addEventListener('click', addOption);

    function addOption(ev) {
        ev.preventDefault();

        let text = document.getElementById('newItemText').value;
        let value = document.getElementById('newItemValue').value;

        let option = document.createElement('option');
        option.textContent = text;
        option.value = value;

        select.appendChild(option);

        form.reset();
    }
}