function printMatrix(n) {
    const row = Array(n).fill(n).join(' ');
    const matrix = Array(n).fill(row).join('\n');

    console.log(matrix);
}


printMatrix(7)
