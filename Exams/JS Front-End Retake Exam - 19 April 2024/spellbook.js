function spellbook(input) {
    let data = input[0];
    let commands = input.slice(1)

    for (let command of commands) {
        let parts = command.split('!')

        let action = parts[0]

        if (action === 'End') break;
        

        if (action === 'RemoveEven') {
            data = data.split('')
              .filter((_, index) => index % 2 === 0)
              .join('');
              console.log(data)

        } else if (action === 'TakePart') {
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

    console.log(`The concealed spell is: ${data}`)
   
}



spellbook(["hZwemtroiui5tfone1haGnanbvcaploL2u2a2n2i2m", 
    "TakePart!31!42",
    "RemoveEven",
    "Reverse!anim",
    "Reverse!sad",
    "End"])
    
    