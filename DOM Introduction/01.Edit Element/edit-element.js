// function editElement(ref, match, replacer) {
//     const content = ref.textContent;
//     const matcher = new RegExp(match, 'g');
//     const edited = content.replace(matcher, replacer);
//     ref.textContent = edited;
// }


function editElement(ref, match, replacer) {
    ref.textContent = ref.textContent.replaceAll(match, replacer)
}