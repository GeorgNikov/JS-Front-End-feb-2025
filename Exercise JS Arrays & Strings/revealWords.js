function revealWords(words, sentence) {
    let wordsArr = words.split(', ');
    for (let word of wordsArr) {
        sentence = sentence.replace('*'.repeat(word.length), word);
    }
    return sentence;
}

console.log(revealWords('great', 'softuni is ***** place for learning new programming languages'));
// Expected output: "softuni is great place for learning new programming languages"

console.log(revealWords('great, learning', 'softuni is ***** place for ******** new programming languages'));
// Expected output: "softuni is great place for learning new programming languages"

console.log(revealWords('learning, great', 'softuni is ***** place for ******** new programming languages'));
// Expected output: "softuni is great place for learning new programming languages"
