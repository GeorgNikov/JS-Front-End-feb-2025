class Person {
    // firstName;
    // lastName;
    // age;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    static formatName(person) {
        return `${person.lastName}, ${person.firstName}`;
    }

    seyHello() {
        console.log(`Hello there! My name is ${this.firstName} ${this.lastName}`)
    }
}

let myPerson = new Person('Peter', 'Parker', 23);
let myPerson2 = new Person('Ivan', 'Ivanov', 43);

console.log(Person.formatName(myPerson));
myPerson2.seyHello()