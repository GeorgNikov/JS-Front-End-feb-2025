// function calculate(num1, num2, operator) {
//     switch (operator) {
//         case "multiply":
//             return num1 * num2;
//         case "divide":
//             return num1 / num2;
//         case "add":
//             return num1 + num2;
//         case "subtract":
//             return num1 - num2;
//         default:
//             return "Invalid operator";
//     }
// }

function calculate(num1, num2, operator) {
    const operations = {
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b,
        add: (a, b) => a + b,
        subtract: (a, b) => a - b
    };

    return operations[operator](num1, num2);
}


console.log(calculate(55, 5, "divide"))