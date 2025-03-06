// function solve(num1, num2, num3) {
//     function sum(a, b) {
//         return a + b;
//     }

//     function subtract(total, c) {
//         return total - c;
//     }

//     let result = sum(num1, num2);
//     result = subtract(result, num3);

//     return result;
// }


function solve(num1, num2, num3) {
    const sum = (a, b) => a + b;
    const subtract = (total, c) => total - c;

    return subtract(sum(num1, num2), num3);
}

console.log(solve(23, 6, 10))
console.log(solve(1 , 17, 30))
console.log(solve(42, 58, 100))