function solve(arr, rotations) {
    for (let i=0; i < rotations % arr.length; i++) {
        let element = arr.shift();
        arr.push(element)
    }

    return arr.join(' ');
}

console.log(solve([51, 47, 32, 61, 21], 2))
console.log(solve([32, 21, 61, 1], 4))
console.log(solve([2, 4, 15, 31], 5))