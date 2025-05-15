function solve(data) {
    let n = parseInt(data[0]);
    let baristaData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let baristas = {}

    for (let line of baristaData) {
        let [name, shift, coffee] = line.split(" ");
        baristas[name] = {
            name,
            shift,
            coffee: coffee.split(','), // convert to array
        };
    }

    for (let command of commands) {
        let tokens = command.split(' / ');
        let action = tokens[0]
        let name = tokens[1];
        
        if (action == 'Closed') {
            break;
        }

        if (action == 'Prepare') {
            let shift = tokens[2];
            let coffee = tokens[3];

            if (baristas[name].shift == shift && baristas[name].coffee.includes(coffee)) {
                console.log(`${name} has prepared a ${coffee} for you!`);
            } else {
                console.log(`${name} is not available to prepare a ${coffee}.`);
            }

        } else if (action == 'Change Shift') {
            let newShift = tokens[2];

            baristas[name].shift = newShift;
            console.log(`${name} has updated his shift to: ${newShift}`)


        } else if (action == 'Learn') {
            let newCoffee = tokens[2];

            if (baristas[name].coffee.includes(newCoffee)) {
                console.log(`${name} knows how to make ${newCoffee}.`);
            } else {
                console.log(`${name} has learned a new coffee type: ${newCoffee}.`);
                baristas[name].coffee.push(newCoffee);
            }
            
        }
    }
    
    for (let b of Object.values(baristas)) {
        console.log(`Barista: ${b.name}, Shift: ${b.shift}, Drinks: ${b.coffee.join(', ')}`);
    }
}

solve(
    ['4',
        'Alice day Espresso,Cappuccino',
        'Bob night Latte,Mocha',
        'Carol day Americano,Mocha',
        'David night Espresso',
        'Prepare / Alice / day / Espresso',
        'Change Shift / Bob / day',
        'Learn / Carol / Latte',
        'Prepare / Bob / night / Latte',
        'Learn / David / Cappuccino',
        'Prepare / Carol / day / Cappuccino',
        'Change Shift / Alice / night',
         'Learn / Bob / Mocha',
        'Prepare / David / night / Espresso',
        'Closed']
        
)