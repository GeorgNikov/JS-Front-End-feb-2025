// function solve() {
//   let input = document.getElementById("text").value;
//   let currentCase = document.getElementById("naming-convention").value;

//   input = input.toLowerCase();
//   let result = 'Error!'

//   if (currentCase === 'Pascal Case') {
//     result = toPascalCase(input)
//   } else if (currentCase === 'Camel Case') {
//     result = toCamelCase(input)
//   }

//   document.getElementById('result').innerText = result

//   // Transform string to Pascal Case
//   function toPascalCase(str) {
//     return str
//       .toLowerCase()
//       .replace(/(?:^|\s|[_-])(\w)/g, (_, c) => c.toUpperCase());
//   }

//   // Transform string to Camel Case
//   function toCamelCase(str) {
//     return str
//       .toLowerCase()
//       .replace(/(?:^|\s|[_-])(\w)/g, (match, c, index) => index === 0 ? c : c.toUpperCase());
//   }
// }


// // Second solution
function solve() {
  let input = document.getElementById("text").value.toLowerCase();
  let currentCase = document.getElementById("naming-convention").value;
  let words = input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));

  let result = currentCase === "Camel Case" 
    ? words[0].toLowerCase() + words.slice(1).join("") 
    : currentCase === "Pascal Case" 
    ? words.join("") 
    : "Error!";

  document.getElementById("result").textContent = result;
}


// Lector solution
// function solve() {
//   let textInput = document.getElementById('text');
//   let commandInput = document.getElementById('naming-convention');

//   let text = textInput.value.toLowerCase();
//   let tokens = text.split(' ');
//   let command = commandInput.value;

//   let output = document.getElementById('result');

//   if (command != 'Pascal Case' && command != 'Camel Case') {
//     output.textContent = 'Error!';

//     return;
//   }

//   for (let i = 1; i < tokens.length; i++) {
//     let word = tokens[0]

//     word = word[0].toUpperCase() + word.slice(1);

//     tokens[i] = word;
//   }

//   if (command == 'Pascal Case') {
//     let word = tokens[0];

//     word = word[0].toUpperCase() + word.slice(1);

//     tokens[0] = word
//   }

//   output.textContent = tokens.join('');
// }