document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', (event) => {
            event.target.parentElement.classList.add('focused');  
        });
        
        input.addEventListener('blur', (event) => {
            event.target.parentElement.classList.remove('focused');
        });
    });
}
