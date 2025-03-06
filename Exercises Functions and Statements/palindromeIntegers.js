// function checkPalindromes(arr) {
//     return arr.map(num => {
//         let strNum = num.toString();
//         return strNum === strNum.split('').reverse().join('') ? 'true' : 'false';
//     }).join('\n');
// }


function checkPalindromes(arr) {
    const msg = arr.map(num => {
        const str = num.toString();
        return str === str.split('').reverse().join('');
    });
    return msg.join('\n');
}


console.log(checkPalindromes([123, 323, 421, 121]));
console.log('-----')
console.log(checkPalindromes([31, 2, 232, 1010])); 