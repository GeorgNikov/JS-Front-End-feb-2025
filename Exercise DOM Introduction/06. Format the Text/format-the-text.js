function solve() {
  let sentences = document.getElementById("input").value.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
  let groupSize = 3;
  let output = document.getElementById("output");

  output.innerHTML = ''; // Clear previous content

  for (let i = 0; i < sentences.length; i += groupSize) {
      let group = sentences.slice(i, i + groupSize).join('. ') + '.';
      output.innerHTML += `<p>${group}</p>`;
  }
}