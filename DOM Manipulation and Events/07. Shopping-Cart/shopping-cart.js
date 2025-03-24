document.addEventListener('DOMContentLoaded', solve);

function solve() {
    let cart = {};

    let output = document.querySelector('textarea');
    output.value = ''
    let buyButtons = document.querySelectorAll('.add-product');


    for (let btn of buyButtons) {
        btn.addEventListener('click', onBuyClick);
    }

    let checkoutBtn = document.querySelector('.checkout');
    checkoutBtn.addEventListener('click', onCheckout);


    function onBuyClick(event) {
        let productRow = event.target.parentElement.parentElement;
        let name = productRow.querySelector('.product-title').textContent;

        let price = Number(productRow.querySelector('.product-line-price').textContent);

        output.value += `Added ${name} for ${price.toFixed(2)} to the cart.\n`

        if (!cart.hasOwnProperty(name)) {
            cart[name] = 0;
        }

        cart[name] += price;
    }

    function onCheckout() {
        let sum = 0;

        for (let price of Object.values(cart)) {
            sum += price;
        }

        let result = `You bought ${Object.keys(cart).join(', ')} for ${sum.toFixed(2)}.`;

        output.value += result;

        checkoutBtn.removeEventListener('click', onCheckout);

        for (let btn of buyButtons) {
            btn.removeEventListener('click', onBuyClick);
        }
    }

}
