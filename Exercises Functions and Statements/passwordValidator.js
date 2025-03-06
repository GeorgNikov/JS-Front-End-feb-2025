// function validatePassword(password) {
//     let messages = [];

//     if (password.length < 6 || password.length > 10) {
//         messages.push('Password must be between 6 and 10 characters');
//     }
//     if (!/^[a-zA-Z0-9]+$/.test(password)) {
//         messages.push('Password must consist only of letters and digits');
//     }
//     if ((password.match(/\d/g) || []).length < 2) {
//         messages.push('Password must have at least 2 digits');
//     }

//     if (messages.length === 0) {
//         return 'Password is valid';
//     } else {
//         return messages.join('\n');
//     }
// }

function validatePassword(password) {
    const validations = [
        { test: password => password.length >= 6 && password.length <= 10, message: 'Password must be between 6 and 10 characters' },
        { test: password => /^[a-zA-Z0-9]+$/.test(password), message: 'Password must consist only of letters and digits' },
        { test: password => (password.match(/\d/g) || []).length >= 2, message: 'Password must have at least 2 digits' }
    ];

    const messages = validations
        .filter(validation => !validation.test(password))
        .map(validation => validation.message);

    return messages.length === 0 ? 'Password is valid' : messages.join('\n');
}


// Example usage:
console.log(validatePassword("logIn"));    // Output: "Password is valid"
// validatePassword("abcd12");    // Output: "Password must be between 6 and 10 characters"
// validatePassword("abc12#");    // Output: "Password must consist only of letters and digits"
// validatePassword("a1b2c3");    // Output: "Password is valid"
