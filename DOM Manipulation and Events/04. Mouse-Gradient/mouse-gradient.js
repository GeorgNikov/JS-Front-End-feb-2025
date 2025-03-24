function attachGradientEvents() {
    let gradient = document.getElementById('gradient');
    const result = document.getElementById('result');

    gradient.addEventListener('mousemove', (ev) => {
        let value = Math.floor((ev.offsetX / gradient.clientWidth) * 100);

        result.textContent = `${value}%`;
    })
}
