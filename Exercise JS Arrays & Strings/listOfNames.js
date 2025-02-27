function solve(arr) {
    arr.sort((a, b) => a.localeCompare(b))

    for (let [i, value] of arr.entries()) {
        console.log(`${i + 1}.${value}`);
    }
}

solve(["John", "Bob", "Christina", "Ema"])
