function solve() {
   let searchTerm = document.getElementById('searchText').value.toLowerCase();
   let towns = document.querySelectorAll('#towns li');
   
   let matchCount = 0;
   
   towns.forEach(town => {
     //   town.classList.remove('highlight');
       town.style.fontWeight = 'normal';
        town.style.textDecoration = 'none';
   });

   
   // Search and highlight matching towns
   towns.forEach(town => {
     if (town.textContent.toLowerCase().includes(searchTerm)) {
         town.style.fontWeight = 'bold';
         town.style.textDecoration = 'underline';
         matchCount++;
     }
 });
   
   document.getElementById('result').textContent = `${matchCount} matches found`;
}