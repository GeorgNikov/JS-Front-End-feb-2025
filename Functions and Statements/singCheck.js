function checkSign(numOne, numTwo, numThree) {
    let negativeCount = 0;

    if (numOne < 0) negativeCount++;
    if (numTwo < 0) negativeCount++;
    if (numThree < 0) negativeCount++;

    return negativeCount % 2 === 0 ? "Positive" : "Negative"
}

console.log(checkSign(-5,1,1))