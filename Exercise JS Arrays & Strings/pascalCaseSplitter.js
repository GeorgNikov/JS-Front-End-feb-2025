function solve(text) {
    let regex = /(?=[A-Z])/g;

    let splittedText = text.split(regex);

    console.log(splittedText.join(', '));
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCan')