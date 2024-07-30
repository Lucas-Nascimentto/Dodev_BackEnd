const {DataTypes} = require("sequelize");
const sequelize = require("./database");

const Usuario = sequelize.define('Usuario', {
    email:{
        primarykey: true,
        type: DataTypes.STRING
    },

    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING
});

module.exports = Usuario;