function solve() {
    const input = document.getElementById('input').value;
    const convert = document.getElementById('selectMenuTo').value;

    let result;

    if (convert === 'binary') {
        result = parseInt(input).toString(2); // Convert to binary
    } else if (convert === 'hexadecimal') {
        result = parseInt(input).toString(16); // Convert to hexadecimal
    }

    document.getElementById('result').value = result.toUpperCase();
}
