function solve() {
    let currentStopId = 'depot';
    let currentStopName = '';

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStopId}`);
            const data = await response.json();

            if (data && data.name && data.next) {
                document.querySelector('.info').textContent = `Next stop ${data.name}`;
                currentStopId = data.next;
                currentStopName = data.name;

                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = false;
            } else {
                throw new Error('Invalid data received');
            }
        } catch (error) {
            document.querySelector('.info').textContent = 'Error';
            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = true;
        }
    }

    function arrive() {
        document.querySelector('.info').textContent = `Arriving at ${currentStopName}`;
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
