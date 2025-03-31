document.addEventListener('DOMContentLoaded', solve);

function solve() {
   let submitBtn = document.querySelector('input[type="submit"]');
   submitBtn.addEventListener('click', onClick);

   function onClick(ev) {
      ev.preventDefault();

      let input = document.querySelector("input[type='text']").value;
      let sections = input.split(", ");
      let output = document.getElementById('content');

      for (let str of sections) {
         let newDiv = document.createElement('div');
         let newP = document.createElement('p');

         newP.textContent = str;

         newDiv.appendChild(newP);
         output.append(newDiv);
      }
   }
}