class User {
    static usersNumber = 0;
    static countUsers() {
        User.usersNumber++;
    }
    static {
        console.log('Load class USER');
    }

    #name;
    #age;
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
        User.countUsers();
    }

    // get name() {
    //     return this.#name;
    // }

    // set name(name) {
    //     this.#name = name;
    // }

    greet() {
        console.log(`Hola, soy ${this.#name} y tengo ${this.#age} años`);
    }

    grow() {
        this.#age++;
    }
}

const user1 = new User('Pepe', 22);
const user2 = new User('Juan', 24);

console.log(user1, user2);
user1.address = 'Soria';
// // user1.#name = 'Jose';
// // delete user1.#name;
console.log(user1, user2);

user1.grow();
user1.greet();
user2.greet();

console.log(User.usersNumber);

// user1.name = 'Jose';
// console.log(user1.name);
