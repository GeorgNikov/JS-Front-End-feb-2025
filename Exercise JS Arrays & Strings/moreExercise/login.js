function login(arr) {
    let username = arr.shift()
    let counter = 0

    for (let password of arr) {

        let reversedPassword = password.split('').reverse().join('');
        if (reversedPassword === username) {
            console.log(`User ${username} logged in.`);
            return;
        } else if (counter === 3) {
            break;
        } else {
            console.log('Incorrect password. Try again.');
        }
        counter++;
    }
    console.log(`User ${username} blocked!`);
}



login(['Acer', 'login', 'go', 'let me in', 'recA'])
login(['sunny', 'rainy', 'cloudy', 'sunny', 'not sunny'])
login(['momo', 'omom'])