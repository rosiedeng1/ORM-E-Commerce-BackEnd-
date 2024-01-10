require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: '127.0.01',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });



console.log('successfully connected')
module.exports = sequelize;
