function colorize() {
    let collection = document.querySelectorAll("tbody tr");

    for (let i = 0; i < collection.length; i++) {
        if (i % 2 == 1) {
            collection[i].style.backgroundColor = "teal"
        }
    }
}