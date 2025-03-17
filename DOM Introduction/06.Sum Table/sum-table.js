function sumTable() {
    let total = 0

    document.querySelectorAll("tbody tr").forEach((row, index, rows) => {
        let priceCell = row.cells[1];

        if (index < rows.length - 1) {
            let price = parseFloat(priceCell.textContent);
            if (!isNaN(price)) {
                total += price
            }
        }
    });

    document.getElementById("sum").textContent = total.toFixed(2);
}