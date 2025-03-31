document.addEventListener('DOMContentLoaded', solve);

function solve() {
    let times = { days: 1, hours: 24, minutes: 1440, seconds: 86400 };
    let inputs = {
        days: document.getElementById('days-input'),
        hours: document.getElementById('hours-input'),
        minutes: document.getElementById('minutes-input'),
        seconds: document.getElementById('seconds-input')
    };

    for (let unit in times) {
        document.getElementById(unit + 'Btn').addEventListener('click', (event) => {
            event.preventDefault();

            let value = parseFloat(inputs[unit].value);

            let days = value / times[unit];
            for (let unit in times) {
                inputs[unit].value = (days * times[unit]).toFixed(2);
            }
        });
    }
}