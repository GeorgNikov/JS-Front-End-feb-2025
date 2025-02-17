// function solve(day, age) {
//     let result;

//     if (age < 0 || age > 122) {
//         console.log("Error!");
//         return;

//     }else if (age >= 0 && age <= 18) {
//         switch (day) {
//             case 'Weekday': result = 12; break;
//             case 'Weekend': result = 15; break;
//             case 'Holiday': result = 5; break;
//         }

//     }else if (age > 18 && age <= 64) {
//         switch (day) {
//             case 'Weekday': result = 18; break;
//             case 'Weekend': result = 20; break;
//             case 'Holiday': result = 12; break;
//         }

//     }else if (age > 64 && age <= 122) {
//         switch (day) {
//             case 'Weekday': result = 12; break;
//             case 'Weekend': result = 15; break;
//             case 'Holiday': result = 10; break;
//         }
        
//     }

//     console.log(`${result}$`);
// }


function solve(day, age) {
    if (age < 0 || age > 122) {
        console.log("Error!");
        return;
    }

    const prices = {
        "Weekday": [12, 18, 12],
        "Weekend": [15, 20, 15],
        "Holiday": [5, 12, 10]
    };

    const category = age <= 18 ? 0 : age <= 64 ? 1 : 2;
    
    console.log(`${prices[day][category]}$`);
}

solve("Weekday", 42);  // Output: 20$
solve("Holiday", -12);   // Output: 10$
solve("Holiday", 15);   // Output: Error!