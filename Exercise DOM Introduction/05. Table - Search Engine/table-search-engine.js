function solve() {
   const searchValue = document.getElementById('searchField').value.toLowerCase();

   document.getElementById('searchField').value = '';

   const rows = document.querySelectorAll('tbody tr');

   rows.forEach(row => row.classList.remove('select'));


   rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let matchFound = false;

      // If the search input is empty, do nothing .. Test 6
      if (!searchValue) {
         return;
      }

      cells.forEach(cell => {
         if (cell.textContent.toLowerCase().includes(searchValue)) {
            matchFound = true;
         }
      });

      if (matchFound) {
         row.classList.add('select');
      }
   });
}