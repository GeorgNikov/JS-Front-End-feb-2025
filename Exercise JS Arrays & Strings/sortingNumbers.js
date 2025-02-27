function sortNumbers(arr) {
    arr.sort((a, b) => a - b);

    let result = [];
    while (arr.length) {
        result.push(arr.shift());
        if (arr.length) {
            result.push(arr.pop());
        }
    }
    return result;
}

console.log(sortNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
// Expected output: [-3, 65, 1, 63, 3, 56, 18, 52, 31, 48]