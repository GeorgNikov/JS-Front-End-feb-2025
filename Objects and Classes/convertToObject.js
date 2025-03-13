function solve(jsonStr) {
    let person = JSON.parse(jsonStr);
    let entries = Object.entries(person);

    for (let [key, value] of entries) {
        console.log(`${key}: ${value}`);
    }
}