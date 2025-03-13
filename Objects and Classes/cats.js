// function cats(input) {
//     input.forEach(entry => {
//         let [name, age] = entry.split(' ');
//         console.log(`${name}, age ${age} says Meow`);
//     });
// }


// class Cat {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     meow() {
//         console.log(`${this.name}, age ${this.age} says Meow`);
//     }
// }

// function createCats(input) {
//     input.forEach(entry => {
//         let [name, age] = entry.split(' ');
//         let cat = new Cat(name, age);
//         cat.meow();
//     });
// }


function makeCat(input) {
    input.forEach(entry => {
        let [name, age] = entry.split(' '); 
        
        let cat = {
            name,
            age,
            meow() {
                console.log(`${this.name}, age ${this.age} says Meow`);
            }
        };

        cat.meow();
    });
}


makeCat(['Mellow 2', 'Tom 5'])