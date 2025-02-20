function solve(peaople, group, day) {
    let price = 0;
    switch (group) {
        case 'Students':
            switch (day) {
                case 'Friday':
                    price = 8.45;
                    break;
                case 'Saturday':
                    price = 9.80;
                    break;
                case 'Sunday':
                    price = 10.46;
                    break;
            }
            break;
        case 'Business':
            switch (day) {
                case 'Friday':
                    price = 10.90;
                    break;
                case 'Saturday':
                    price = 15.60;
                    break;
                case 'Sunday':
                    price = 16;
                    break;
            }
            break;
        case 'Regular':
            switch (day) {
                case 'Friday':
                    price = 15;
                    break;
                case 'Saturday':
                    price = 20;
                    break;
                case 'Sunday':
                    price = 22.50;
                    break;
            }
            break;
    }
    let totalPrice = price * peaople;
    if (group === 'Students' && peaople >= 30) {
        totalPrice *= 0.85;
    } else if (group === 'Business' && peaople >= 100) {
        totalPrice -= 10 * price;
    } else if (group === 'Regular' && peaople >= 10 && peaople <= 20) {
        totalPrice *= 0.95;
    }
    return `Total price: ${totalPrice.toFixed(2)}`;
}

console.log(solve(30, 'Students', 'Sunday'));
console.log(solve(40, 'Regular', 'Saturday'));

// Second solution

function vacation(people, group, day) {
    const prices = {
        Students: { Friday: 8.45, Saturday: 9.80, Sunday: 10.46 },
        Business: { Friday: 10.90, Saturday: 15.60, Sunday: 16.00 },
        Regular: { Friday: 15.00, Saturday: 20.00, Sunday: 22.50 }
    };

    let pricePerPerson = prices[group][day];
    let totalPrice = pricePerPerson * people;

    // Apply discounts
    if (group === 'Students' && people >= 30) {
        totalPrice *= 0.85;
    } else if (group === 'Business' && people >= 100) {
        totalPrice -= 10 * pricePerPerson;
    } else if (group === 'Regular' && people >= 10 && people <= 20) {
        totalPrice *= 0.95;
    }

    return `Total price: ${totalPrice.toFixed(2)}`;
}

// Example usage:
console.log(vacation(30, 'Students', 'Sunday'));
console.log(vacation(40, 'Regular', 'Saturday'));
console.log(vacation(40, "Students", "Friday"));  // Total price: 286.70
console.log(vacation(120, "Business", "Saturday")); // Total price: 1716.00
console.log(vacation(15, "Regular", "Sunday"));  // Total price: 320.63
console.log(vacation(5, "Regular", "Sunday"));  // Total price: 112.50
console.log(vacation(10, "Regular", "Sunday"));  // Total price: 202.50