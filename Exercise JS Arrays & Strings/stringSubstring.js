function findWord(word, text) {

    let splitWords = text.split(' ');

    for (let words of splitWords) {
        if (word.toLowerCase() === words.toLowerCase()) {
            return word;
        }
    }

    return `${word} not found!`

}

