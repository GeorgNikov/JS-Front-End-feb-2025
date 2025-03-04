function orders(product, qty) {
    let products = {
        coffee: 1.50,
        water: 1.00,
        coke: 1.40,
        snacks: 2.00
    };

    let totalPrice = products[product] * qty

    return totalPrice.toFixed(2)

}

console.log(orders("coffee", 2))