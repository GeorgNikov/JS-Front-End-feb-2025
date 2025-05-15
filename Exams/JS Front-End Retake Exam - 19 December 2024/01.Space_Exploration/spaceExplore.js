function spaceExplore(data) {
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

            if (astronauts[name].spacecraft == section && astronauts[name].skills.includes(skill)) {
                console.log(`${name} has successfully performed the skill: ${skill}!`);
            } else {

                console.log(`${name} cannot perform the skill: ${skill}.`);
            }

        } else if (action == 'Transfer') {
            let newSection = tokens[2];

            console.log(`${name} has been transferred to: ${newSection}`);
            astronauts[name].spacecraft = newSection;

        } else if (action == 'Learn Skill') {
            let newSkill = tokens[2];

            if (astronauts[name].skills.includes(newSkill)) {
                console.log(`${name} already knows the skill: ${newSkill}.`);
                
            } else {

                console.log(`${name} has learned a new skill: ${newSkill}.`);
                astronauts[name].skills.push(newSkill);
            }
            
        }
    }
    
    for (let astronaut of Object.values(astronauts)) {
        console.log(`Astronaut: ${astronaut.name}, Section: ${astronaut.spacecraft}, Skills: ${astronaut.skills.sort().join(', ')}`);
    }
}

spaceExplore(
    [
        "3",
        "Tom engineering_bay construction,maintenance",
        "Sara research_lab analysis,sampling",
        "Chris command_module piloting,communications",
        "Perform / Tom / engineering_bay / construction",
        "Learn Skill / Sara / robotics",
        "Perform / Sara / research_lab / robotics",
        "Transfer / Chris / research_lab",
        "Perform / Chris / research_lab / piloting",
        "Learn Skill / Tom / diagnostics",
        "Perform / Tom / engineering_bay / diagnostics",
        "End"
      ]
      
      
)