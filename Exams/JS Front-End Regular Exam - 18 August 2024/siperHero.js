function superHero(data) {
    let n = parseInt(data[0]);
    let heroesData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let heroes = {};
    
    for (let hero of heroesData) {
        let [name, superpower, energy] = hero.split("-"); // Разделяме по интервал
        heroes[name] = {
            name: name,
            superpowers: superpower.split(','),
            energy: parseInt(energy)
        };
    }

    for (let command of commands) {
        let [action, ...tokens] = command.split(' * ');
        let superhero = tokens[0]       
        
        if (action === 'Evil Defeated!') {
            break;
        }

        if (action === 'Use Power') {
            let superpower = tokens[1]
            let energy = parseInt(tokens[2]);          

            if (heroes[superhero].superpowers.includes(superpower) && energy <= heroes[superhero].energy) {
                heroes[superhero].energy -= energy;

                console.log(`${superhero} has used ${superpower} and now has ${heroes[superhero].energy} energy!`); 
            } else {

                console.log(`${superhero} is unable to use ${superpower} or lacks energy!`);
            }           
            
        } else if (action === 'Train') {
            let trainingEnergy = parseInt(tokens[1]);
            let totalEnergy = heroes[superhero].energy + trainingEnergy;
            
            if (heroes[superhero].energy < 100) {
                let diff = trainingEnergy;
            
                if (totalEnergy > 100) {
                    diff = 100 - heroes[superhero].energy; // Само толкова, колкото е нужно
                    heroes[superhero].energy = 100;
                } else {
                    heroes[superhero].energy = totalEnergy;
                }
            
                console.log(`${superhero} has trained and gained ${diff} energy!`);
            } else {

                console.log(`${superhero} is already at full energy!`);
            }
            
        } else if (action === 'Learn') {
            let newSuperpower = tokens[1]

            if (heroes[superhero].superpowers.includes(newSuperpower)) {

                console.log(`${superhero} already knows ${newSuperpower}.`);  
            } else {
                heroes[superhero].superpowers.push(newSuperpower);

                console.log(`${superhero} has learned ${newSuperpower}!`);  
            }
        }
   
    }

    for (let hero of Object.values(heroes)) {
        console.log(`Superhero: ${hero.name}\n- Superpowers: ${hero.superpowers.join(", ")}\n- Energy: ${hero.energy}`);
    }
    
}

superHero([
    "2",
    "Iron Man-Repulsor Beams,Flight-100",
    "Thor-Lightning Strike,Hammer Throw-50",
    "Train * Thor * 20",
    "Learn * Thor * Hammer Throw",
    "Use Power * Iron Man * Repulsor Beams * 30",
    "Evil Defeated!"
])


    
