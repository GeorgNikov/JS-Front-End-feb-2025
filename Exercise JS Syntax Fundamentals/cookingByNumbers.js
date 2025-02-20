function solve(num, op1, op2, op3, op4, op5) {
    let actions = [op1, op2, op3, op4, op5];

    let options = {
        chop: (n) => n/2,
        dice: (n) => Math.sqrt(n),
        spice: (n) => n + 1,
        bake: (n) => n * 3,
        fillet: (n) => n * 0.8
    };

    for (let action of actions) {
        let option = options[action];

        num = option(num);

        console.log(num);
    }
}

solve('32', 'chop', 'chop', 'chop', 'chop', 'chop')

