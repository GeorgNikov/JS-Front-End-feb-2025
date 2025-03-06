function sumEvenOddDigits(num) {
    let evenSum = 0;
    let oddSum = 0;

    num.toString().split('').forEach(digit => {
        let n = Number(digit);
        n % 2 === 0 ? evenSum += n : oddSum += n;
    });

    return `Odd sum = ${oddSum}, Even sum = ${evenSum}`;
}

console.log(sumEvenOddDigits(1000435));
console.log(sumEvenOddDigits(3495892137259234));