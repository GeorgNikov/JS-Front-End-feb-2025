function encode(input) {
    let data = input[0];
    let commands = input.slice(1)

    for (let command of commands) {
        let parts = command.split('!')

        let action = parts[0]

        if (action === 'Buy') break;
        

        if (action === 'RemoveEven') {
            data = data.split('')
              .filter((_, index) => index % 2 === 0)
              .join('');
              console.log(data)

        } else if (action === 'ChangeAll') {
            let startIndex = parseInt(parts[1]);
            let endIndex = parseInt(parts[2]);

            data = data.slice(startIndex, endIndex);
            console.log(data)

        } else if (action === 'Reverse') {
            let substring = parts[1];

            if (data.includes(substring)) {
                let reversedSubstring = substring.split('').reverse().join('');
            
                data = data.replace(substring, '') + reversedSubstring;
                console.log(data);

            } else {
                console.log("Error");
            }

        } 

    }

    console.log(`The cryptocurrency is: ${data}`)
   
}


encode(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs", 
    "TakeEven",
    "Reverse?!nzahc",
    "ChangeAll?m?g",
    "Reverse?adshk",
    "ChangeAll?z?i",
    "Buy"])
    