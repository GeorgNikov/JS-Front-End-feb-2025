function solve() {
    let inputText = document.querySelector('textarea').value;
    let data = JSON.parse(inputText);

    let restaurants = {};

    data.forEach(entry => {
        let [location, workers] = entry.split(' - ');
        let workersArray = workers.split(', ').map(person => {
            let [name, salary] = person.split(' ');
            return { name, salary: parseFloat(salary) };
        });

        if (!restaurants[location]) {
            restaurants[location] = { workers: [], totalSalary: 0, averageSalary: 0, bestSalary: 0 };
            console.log(restaurants[location])
        }

        restaurants[location].workers.push(...workersArray);
        restaurants[location].totalSalary += workersArray.reduce((sum, worker) => sum + worker.salary, 0);
        restaurants[location].averageSalary = restaurants[location].totalSalary / restaurants[location].workers.length;
        restaurants[location].bestSalary = Math.max(...restaurants[location].workers.map(worker => worker.salary));
    });

    let bestRestaurant = Object.entries(restaurants).sort((a, b) => b[1].averageSalary - a[1].averageSalary)[0];

    document.querySelector('#bestRestaurant p').textContent = `Name: ${bestRestaurant[0]} Average Salary: ${bestRestaurant[1].averageSalary.toFixed(2)} Best Salary: ${bestRestaurant[1].bestSalary.toFixed(2)}`;
    let workersHTML = bestRestaurant[1].workers.sort((a, b) => b.salary - a.salary).map(worker => `Name: ${worker.name} With Salary: ${worker.salary}`).join(' ');

    document.querySelector('#workers p').innerHTML = workersHTML;
}