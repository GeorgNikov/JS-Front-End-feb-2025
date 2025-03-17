function reversArray(n, numArray) {
    let newArr = numArray.slice(0, n).reverse();

    return newArr.join(' ');
}

console.log(reversArray(
    2, [66, 43, 75, 89, 47]
))