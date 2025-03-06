function loadingBar(n) {
    const percentage = `${n}%`;
    const completed = '%'.repeat(n / 10);
    const remaining = '.'.repeat(10 - completed.length);

    if (n === 100) {
        console.log(`${percentage} Complete!`);
        console.log(`[${completed}]`);
    } else {
        console.log(`${percentage} [${completed}${remaining}]`);
        console.log('Still loading...');
    }
}

loadingBar(30);
loadingBar(59);
loadingBar(100); 
