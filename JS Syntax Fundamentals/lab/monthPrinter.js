function solve(num) {
    const months = {
        1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
    };

    if (num < 1 || num > 12) {
        console.log("Error!");
    } else {
        console.log(months[num])
    }
}

solve(10)