function extract(content) {
    let text = document.getElementById("content").textContent;
    let pattern = /\((.+?)\)/g
    let matches = text.match(pattern) || [];

    let result = [];

    for (let match of matches) {
        result.push(match.slice(1, -1));
    }
    // console.log(result.join('; '))
    return result.join('; ');
}