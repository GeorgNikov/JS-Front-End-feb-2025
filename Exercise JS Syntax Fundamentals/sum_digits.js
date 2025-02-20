function solve(number) {
    let sum = 0;
    while (number > 0) {
        let lastDigit = number % 10;
        sum += lastDigit;
        number = Math.floor(number / 10);
    }
    return sum;
}

console.log(solve(543));
console.log(solve(97561));