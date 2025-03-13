function piccolo(arr) {

    let parking = new Set();

    arr.forEach(element => {
        let command = element.split(', ')[0];
        let number = element.split(', ')[1];
        
        if (command === 'IN') {
            parking.add(number)
        } else {
            parking.delete(number)
        }
    });

    let sortedCars = [...parking].sort();

    if (sortedCars.length === 0) {
        console.log('Parking Lot is Empty');
    } else {
        console.log(sortedCars.join('\n'));
    }

}

piccolo(
    ['IN, CA2844AA',
        'IN, CA1234TA',
        'OUT, CA2844AA',
        'IN, CA9999TT',
        'IN, CA2866HI',
        'OUT, CA1234TA',
        'IN, CA2844AA',
        'OUT, CA2866HI',
        'IN, CA9876HH',
        'IN, CA2822UU']
)