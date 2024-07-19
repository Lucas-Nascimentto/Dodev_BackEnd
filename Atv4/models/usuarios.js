const {DataTypes} = require('sequelize'); // Importando DataTypes do Sequelize
const sequelize = require('../config/database'); // Importando a configuração do banco de dados

// Definindo o modelo 'Usuario'
const Usuario = sequelize.define('Usuario', {
    // Definindo a coluna 'email' como chave primária
    email:{
        primaryKey: true,
        type: DataTypes.STRING
    },

    // Definindo as demais colunas da tabela
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING
},{
    // Habilitando timestamps para adicionar colunas 'createdAt' e 'updatedAt'
    timestamps: true
});

module.exports = Usuario; // Exportando o modelo 'Usuario'
