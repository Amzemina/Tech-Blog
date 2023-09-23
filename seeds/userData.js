const { User } = require('../models');

const userData =
    [
        {
            "username": "Best_Jeanist",
            "password": "password123"
        },
        {
            "username": "Zero2",
            "password": "password123"
        },
        {
            "username": "Killua",
            "password": "password123"
        }
    ];

const seedAllUsers = async () => {
    for (const user of userData) {
        await User.create(user);
    }
}

module.exports = seedAllUsers;