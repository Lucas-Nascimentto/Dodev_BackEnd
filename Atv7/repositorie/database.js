const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('atv7', 'root', 'Lucas46xr*', {
    host: 'localhost',
    port: 3306,
    dialect: "mysql"
})

module.exports = sequelize;