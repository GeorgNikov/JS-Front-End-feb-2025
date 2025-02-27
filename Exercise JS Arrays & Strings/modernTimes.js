function extractHashtags(sentence) {

    let words = sentence.split(' ');
    let hashtags = words.filter(word => word.startsWith('#') && word.length > 1 && /^#[A-Za-z]+$/.test(word));

    return hashtags.map(tag => tag.slice(1)).join('\n');
}

console.log(extractHashtags('Nowadays everyone uses # to tag a #special word in #socialMedia'));
console.log(extractHashtags('The symbol # is known #variously in English-speaking #regions as the #number sign'));
// Case 4
console.log(extractHashtags('Nowadays everyone uses # to ## tag a #special word in #socialMedia'));
