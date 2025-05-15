function sciExperiment(data) {
    let n = parseInt(data[0]);
    let chemicalData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);
    const MAX = 500;

    let chemicals = {};
     
    for (let chemical of chemicalData) {
        let [chemicalName, chemicalQuantity] = chemical.split(" # "); // Разделяме по интервал
        chemicals[chemicalName] = {
            Chemical: chemicalName,
            Quantity: Number(chemicalQuantity),
            Formula: []
        };

    }

    for (let command of commands) {
        let tokens = command.split(' # ');
        let action = tokens[0]
        
        if(action === 'End') {
            break;
        }

        if (action === 'Mix') {
            let firstChemical = tokens[1];
            let secondChemical = tokens[2];
            let amount = parseInt(tokens[3]);

            if (chemicals[firstChemical].Quantity >= amount && chemicals[secondChemical].Quantity >= amount) {
                chemicals[firstChemical].Quantity -= amount;
                chemicals[secondChemical].Quantity -= amount;            
                
                console.log(`${firstChemical} and ${secondChemical} have been mixed. ${amount} units of each were used.`);
            } else {
                console.log(`Insufficient quantity of ${firstChemical}/${secondChemical} to mix.`);
            }

        } else if (action === 'Replenish') {
            let chemicalName = tokens[1];
            let chemicalAmount = Number(tokens[2]);

            if (!(chemicalName in chemicals)) {
                console.log(`The Chemical ${chemicalName} is not available in the lab.`);
            } else {
                let total = chemicals[chemicalName].Quantity + chemicalAmount;          
                
                if (total > MAX) {
                    let diff = MAX - chemicals[chemicalName].Quantity
                    chemicals[chemicalName].Quantity = MAX;

                    console.log(`${chemicalName} quantity increased by ${diff} units, reaching maximum capacity of 500 units!`);   
                } else {                  
                    chemicals[chemicalName].Quantity += chemicalAmount;
                    
                    console.log(`${chemicalName} quantity increased by ${chemicalAmount} units!`);  
                }
            }

        } else if (action === 'Add Formula') {
            let newChemical = tokens[1];
            let newFormula = tokens[2];

            if (newChemical in chemicals) {
                chemicals[newChemical].Formula.push(newFormula);

                console.log(`${newChemical} has been assigned the formula ${newFormula}.`);
            } else {
                console.log(`The Chemical ${newChemical} is not available in the lab.`);
            }
        }

        
    }

    for (let chemical of Object.values(chemicals)) {
        console.log(`Chemical: ${chemical.Chemical}, Quantity: ${chemical.Quantity}` +
            (chemical.Formula && chemical.Formula.length > 0 ? `, Formula: ${chemical.Formula.join(", ")}` : ""));
    }
    
}

sciExperiment([ '3',
    'Sodium # 300',
    'Chlorine # 100',
    'Hydrogen # 200',
    'Mix # Sodium # Chlorine # 200',
    'Replenish # Sodium # 250',
    'Add Formula # Sulfuric Acid # H2SO4',
    'Add Formula # Sodium # Na',
    'Mix # Hydrogen # Chlorine # 50',
    'End']
  
  );