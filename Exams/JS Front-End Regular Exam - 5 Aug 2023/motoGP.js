function motoGP(data) {
    let n = parseInt(data[0]);
    let ridersDetails = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let riders = {};
     
    for (let rider of ridersDetails) {
        let [riderName, fuel, position] = rider.split("|"); // Разделяме по интервал
        riders[riderName] = {
            name: riderName,
            fuel: parseFloat(fuel),
            position: parseInt(position)
        };
    }

    for (let command of commands) {
        let tokens = command.split(' - ');
        let action = tokens[0]
        let rider = tokens[1]
        
        if(action === 'Finish') {
            break;
        }

        if (action === 'StopForFuel') {
            let minFuel = parseFloat(tokens[2]);
            let newPosition = parseInt(tokens[3]);

            if (riders[rider].fuel < minFuel) {
                riders[rider].position = newPosition;
                console.log(`${rider} stopped to refuel but lost his position, now he is ${newPosition}.`);
            } else {
                console.log(`${rider} does not need to stop for fuel!`)
            }

        } else if (action === 'Overtaking') {
            let secondRider = tokens[2];

            if (riders[rider].position < riders[secondRider].position) {
                [riders[rider].position, riders[secondRider].position] =
                [riders[secondRider].position, riders[rider].position];
                
                console.log(`${rider} overtook ${secondRider}!`)
            }
        } else if (action === 'EngineFail') {
            let lapsLeft = parseInt(tokens[2]);
            console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
            delete riders[rider];
        }

    }

    for (let rider of Object.values(riders)) {
        console.log(`${rider.name}\n  Final position: ${rider.position}`);
    }
}

motoGP(["4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"])
    
console.log(' ------------ ');

motoGP(["3",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|2",
    "Jorge Lorenzo|80|3",
    "StopForFuel - Valentino Rossi - 50 - 1",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"])
    
