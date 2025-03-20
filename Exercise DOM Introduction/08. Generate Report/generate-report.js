function solve() {
    const checkedCheckboxes = document.querySelectorAll('thead input[type="checkbox"]');

    const selectedColumns = Array.from(checkedCheckboxes)
    .map((checkbox, index) => checkbox.checked ? { name: checkbox.name, index } : null)
    .filter(col => col !== null);
    
    const rows = document.querySelectorAll('tbody tr');
    
    const data = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
    
        return selectedColumns.reduce((obj, col) => {
            obj[col.name] = cells[col.index]?.textContent.trim() || "";
            return obj;
        }, {});
    });

    document.getElementById('output').value = JSON.stringify(data);
}