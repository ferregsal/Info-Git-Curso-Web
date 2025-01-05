const user = {
    name: 'Pepe',
    age: 22,
    'algo-mas': 45,
};

const prop = 'age';

user.name;

user.patata; // undefinef
user.prop; // undefined

user[prop]; // 22
user['name']; // Pepe
user['algo-mas']; // 45

for (const key in user) {
    const element = user[key];
}

const players = [
    {
        name: 'Pepe',
        age: 22,
    },
];
localStorage.setItem('gamePlayers', JSON.stringify(players));
localStorage.getItem('gamePlayers');
JSON.parse(localStorage.getItem('gamePlayers'));
localStorage.removeItem();
