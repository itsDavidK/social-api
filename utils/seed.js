const connection = require('../config/connection');
const{User} = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});

    const users = [
        {
            username: "coolbob",
            email: "coolbob@bob.com",
            thoughts: [],
            friends: []
        }
    ];

    await User.collection.insertMany(users);

    console.table(users);
    console.info("Seeded");
    process.exit(0);

});