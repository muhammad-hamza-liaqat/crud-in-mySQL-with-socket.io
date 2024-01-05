const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize.authenticate().then(() => {
    console.log('connected to task Database');
 }).catch((error) => {
    console.error('something went wrong, DB not connected!');
 });


module.exports = sequelize