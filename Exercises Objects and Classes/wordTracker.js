function wordTracker(data) {
    let result = {};
    let mainWords = data[0].split(" ");

    mainWords.forEach(word => result[word] = 0);

    for (let i = 1; i < data.length; i++) {
        let word = data[i];
        if (result.hasOwnProperty(word)) {
            result[word] += 1;
        }
    }

    Object.entries(result)
    .sort((a, b) => b[1] - a[1])
    .forEach(([word, count]) => console.log(`${word} - ${count}`));
}


wordTracker(
    [
        'is the',
        'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']
);