function encode(input) {
    let data = input[0];
    let commands = input.slice(1)

    for (let command of commands) {
        let parts = command.split('?')

        let action = parts[0]

        if (action === 'Buy') break;
        

        if (action === 'TakeEven') {
            data = data.split('')
              .filter((_, index) => index % 2 === 0)
              .join('');
              console.log(data)

        } else if (action === 'ChangeAll') {
            let substring = parts[1];
            let replacement = parts[2];

            let newData = data.split(substring).join(replacement);
            data = newData;

            console.log(data)

        } else if (action === 'Reverse') {
            let substring = parts[1];

            if (data.includes(substring)) {
                let reversedSubstring = substring.split('').reverse().join('');
            
                data = data.replace(substring, '') + reversedSubstring;
                console.log(data);

            } else {
                console.log("error");
            }

        } 

    }

    console.log(`The cryptocurrency is: ${data}`)
   
}


encode(["PZDfA2PkAsakhnefZ7aZ", 
    "TakeEven",
    "TakeEven",
    "TakeEven",
    "ChangeAll?Z?X",
    "ChangeAll?A?R",
    "Reverse?PRX",
    "Buy"])
    
    