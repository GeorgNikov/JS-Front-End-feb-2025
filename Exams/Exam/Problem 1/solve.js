function solve(data) {
    let n = parseInt(data[0]);
    let astronautData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let astronauts = {}

    for (let line of astronautData) {
        let [name, spacecraft, skills] = line.split(" ");
        astronauts[name] = {
            name,
            spacecraft,
            skills: skills.split(','), // convert to array
        };
    }

    for (let command of commands) {
        let tokens = command.split(' / ');
        let action = tokens[0]
        let name = tokens[1];

        if (action == 'End') {
            break;
        }

        if (action == 'Perform') {
            let section = tokens[2];
            let skill = tokens[3];

           // Edit and TODO

        } else if (action == 'Transfer') {
            let newSection = tokens[2];

            // Edit and TODO

        } else if (action == 'Learn Skill') {
            let newSkill = tokens[2];

            // Edit and TODO
            
        }
    }
    
    // TODO edit this
    for (let astronaut of Object.values(astronauts)) {
        console.log(`Astronaut: ${astronaut.name}, Section: ${astronaut.spacecraft}, Skills: ${astronaut.skills.sort().join(', ')}`);
    }
}

solve(
// Add input
)