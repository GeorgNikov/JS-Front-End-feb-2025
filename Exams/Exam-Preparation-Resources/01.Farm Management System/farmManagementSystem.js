function farmManage(data) {
    let n = parseInt(data[0]);
    let farmarData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let farmers = {};

    for (let line of farmarData) {
        let [name, workArea, tasks] = line.split(" ");
        farmers[name] = {
            name,
            workArea,
            tasks: tasks.split(','), // convert to array
        };
    }

    for (let line of commands) {
        let commandParts = line.split(' / ');
        let currentCommand = commandParts[0];

        if (currentCommand === 'End') {
            break;
        }

        let farmerName = commandParts[1];
        let farmer = farmers[farmerName];

        if (currentCommand === 'Execute') {
            let workArea = commandParts[2];
            let task = commandParts[3];

            if (farmer.tasks.includes(task) && farmer.workArea === workArea) {

                console.log(`${farmerName} has executed the task: ${task}!`);
            } else {

                console.log(`${farmerName} cannot execute the task: ${task}.`);
            }

        } else if (currentCommand === 'Change Area') {
            let newArea = commandParts[2];
            farmer.workArea = newArea;

            console.log(`${farmerName} has changed their work area to: ${newArea}`);
        } else if (currentCommand === 'Learn Task') {
            let newTask = commandParts[2];
            if (farmer.tasks.includes(newTask)) {

                console.log(`${farmerName} already knows how to perform  ${newTask}.`);
            } else {
                farmer.tasks.push(newTask);

                console.log(`${farmerName} has learned a new task: ${newTask}.`);
            }
        }
    }

    for (let farmer of Object.values(farmers)) {
        console.log(`Farmer: ${farmer.name}, Area: ${farmer.workArea}, Tasks: ${farmer.tasks.sort().join(', ')}`);
    }
}


farmManage(
    [
        "3",
        "Alex apiary harvesting,honeycomb",
        "Emma barn milking,cleaning",
        "Chris garden planting,weeding",
        "Execute / Alex / apiary / harvesting",
        "Learn Task / Alex / beeswax",
        "Execute / Alex / apiary / beeswax",
        "Change Area / Emma / apiary",
        "Execute / Emma / apiary / milking",
        "Execute / Chris / garden / watering",
        "Learn Task / Chris / pruning",
        "Execute / Chris / garden / pruning",
        "End"
    ]
)