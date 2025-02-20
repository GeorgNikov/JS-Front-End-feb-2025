function ages(age) {
    if (age < 0) return 'out of bounds';
    
    const categories = [
        { max: 2, label: 'baby' },
        { max: 13, label: 'child' },
        { max: 19, label: 'teenager' },
        { max: 65, label: 'adult' },
        { max: Infinity, label: 'elder' }
    ];

    return categories.find(category => age <= category.max).label;
}

// Example usage:
console.log(solve(1));   // "baby"
console.log(solve(10));  // "child"
console.log(solve(16));  // "teenager"
console.log(solve(20));  // "adult"
console.log(solve(100));  // "elder"
console.log(solve(-5));  // "out of bounds"
