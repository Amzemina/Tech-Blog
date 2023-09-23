const sequelize = require('../config/connection');

const usersSeed = require('./userData');
const postSeed = require('./postData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await usersSeed();
  await postSeed();

  process.exit(0);
};

seedDatabase();