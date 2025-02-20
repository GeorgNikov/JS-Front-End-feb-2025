function solve(number) {
    let sum = 0;
    let isSame = true;
    let lastDigit = number % 10;
    while (number > 0) {
        let digit = number % 10;
        sum += digit;
        if (digit !== lastDigit) {
            isSame = false;
        }
        number = Math.floor(number / 10);
    }
    console.log(isSame);
    console.log(sum);
}

solve(2222222);
solve(1234);
    