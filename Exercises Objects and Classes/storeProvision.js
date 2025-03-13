function store(inStock, order) {
    let provisionsList = {}

    for (let i = 0; i < inStock.length; i += 2) {
        let product = inStock[i];
        let quantity = Number(inStock[i + 1]);
        provisionsList[product] = quantity;
    }

    for (let j = 0; j < order.length; j += 2) {
        let product = order[j];
        let quantity = Number(order[j + 1]);


        if (provisionsList.hasOwnProperty(product)) {
            provisionsList[product] += quantity;
        } else {
            provisionsList[product] = quantity;
        }
    }

    return Object.entries(provisionsList)
        .map(([product, quantity]) => `${product} -> ${quantity}`)
        .join('\n');
}