function findOdd(dataString) {
    let words = dataString.toLowerCase().split(' ');
    let wordCount = {};
    let order = [];

    words.forEach(word => {
        if (!wordCount[word]) {
            wordCount[word] = 0;
            order.push(word);
        }
        wordCount[word]++;
    });

    let result = order.filter(word => wordCount[word] % 2 !== 0);

    console.log(result.join(' '));
}

findOdd(
'Cake IS SWEET is Soft CAKE sweet Food'
)