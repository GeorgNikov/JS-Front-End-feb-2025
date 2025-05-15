function solve(data) {
    let n = parseInt(data[0]);
    let guildData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let guilds = {}

    for (let line of guildData) {
        let [name, role, skills] = line.split(" ");
        guilds[name] = {
            name,
            role,
            skills: skills.split(','),
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
            let role = tokens[2];
            let skill = tokens[3];

            if (guilds[name].role == role && guilds[name].skills.includes(skill)) {
                console.log(`${name} has successfully performed the skill: ${skill}!`);
            } else {
                console.log(`${name} cannot perform the skill: ${skill}.`);
            }
        } else if (action == 'Reassign') {
            let newRole = tokens[2];

            guilds[name].role = newRole;
            console.log(`${name} has been reassigned to: ${newRole}`);
        } else if (action == 'Learn Skill') {
            let newSkill = tokens[2];

            if (guilds[name].skills.includes(newSkill)) {
                console.log(`${name} already knows the skill: ${newSkill}.`);
            } else {
                console.log(`${name} has learned a new skill: ${newSkill}.`);
                guilds[name].skills.push(newSkill);
            }
        }
    }

    for (let member of Object.values(guilds)) {
        console.log(`Guild Member: ${member.name}, Role: ${member.role}, Skills: ${member.skills.sort().join(', ')}`);
    }
}

solve(
    [
        "4",
        "Lancelot knight jousting,swordplay",
        "Morgana sorceress dark_magic,illusion",
        "Robin archer archery,stealth",
        "Galahad paladin healing,swordplay",
        "Perform / Robin / archer / archery",
        "Perform / Morgana / knight / illusion",
        "Learn Skill / Lancelot / swordplay",
        "Learn Skill / Robin / tracking",
        "Learn Skill / Robin / tracking",
        "Reassign / Galahad / warrior",
        "Perform / Galahad / warrior / healing",
        "Reassign / Galahad / healer",
        "Perform / Galahad / healer / healing",
        "End"
      ]
)