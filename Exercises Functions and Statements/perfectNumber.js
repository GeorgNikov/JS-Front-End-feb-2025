function isPerfectNumber(num) {
    if (num <= 1) {
        return "It's not so perfect.";
    }

    let sum = 0;

    for (let i = 1; i <= Math.floor(num / 2); i++) {
        if (num % i === 0) {
            sum += i;
        }
    }

    if (sum === num) {
        return "We have a perfect number!";
    } else {
        return "It's not so perfect.";
    }
}

console.log(isPerfectNumber(6));  
console.log(isPerfectNumber(28));
console.log(isPerfectNumber(1236498));
