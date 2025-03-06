// function factorialDivision(a, b) {
//     function factorial(n) {
//         let result = 1;
//         for (let i = 1; i <= n; i++) {
//             result *= i;
//         }
//         return result;
//     }

//     if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0) {
//         return;
//     }

//     const factorialA = factorial(a);
//     const factorialB = factorial(b);
//     const divisionResult = factorialA / factorialB;

//     return divisionResult.toFixed(2);
// }

// Second solution with reqursion

function factorialDivision(a, b) {
    function factorial(n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0) {
        return;
    }

    const factorialA = factorial(a);
    const factorialB = factorial(b);
    const divisionResult = factorialA / factorialB;

    return divisionResult.toFixed(2);
}


// Third solution Митко Митев

// function solve(num1, num2) {
//     function factorial(num) {
//         return (num > 1) ? factorial(num - 1) * num : 1;
//     }
 
//     console.log((factorial(num1) / factorial(num2)).toFixed(2));
// }


console.log(factorialDivision(5, 2));
console.log(factorialDivision(6, 2));
