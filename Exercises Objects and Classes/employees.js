function listEmployees(employeeNames) {
    let employees = {};
    
    for (let name of employeeNames) {
        employees[name] = name.length;
    }
    
    for (let [name, personalNum] of Object.entries(employees)) {
        console.log(`Name: ${name} -- Personal Number: ${personalNum}`);
    }
}