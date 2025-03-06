// function charsBetween(char1, char2) {
//     let start = Math.min(char1.charCodeAt(0), char2.charCodeAt(0));
//     let end = Math.max(char1.charCodeAt(0), char2.charCodeAt(0));

//     let result = [];
//     for (let i = start + 1; i < end; i++) {
//         result.push(String.fromCharCode(i));
//     }

//     return result.join(' ');
// }


// Second solution

function charsBetween(char1, char2) {
    return Array.from(
        { length: Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0)) - 1 },
        (_, i) => String.fromCharCode(Math.min(char1.charCodeAt(0), char2.charCodeAt(0)) + i + 1)
    ).join(" ");
}

console.log(charsBetween('a', 'd'))
console.log(charsBetween('#', ':'))
console.log(charsBetween('C', '#'))
