'use strict';

const { DATE, STRING, DataTypes } = require('sequelize'); // Importando os tipos de dados do Sequelize

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Criando a tabela 'testeUsuarios' com as colunas especificadas
    await queryInterface.createTable('testeUsuarios', {
      email:{
        primaryKey: true, // Definindo 'email' como chave primária
        type: DataTypes.STRING // Tipo de dado STRING para 'email'
      },
      nome: DataTypes.STRING, // Tipo de dado STRING para 'nome'
      senha: DataTypes.STRING, // Tipo de dado STRING para 'senha'
      telefone: DataTypes.STRING, // Tipo de dado STRING para 'telefone'
      endereco: DataTypes.STRING // Tipo de dado STRING para 'endereco'
    },{
      timestamps: true // Adicionando colunas 'createdAt' e 'updatedAt'
    });
  },

  async down (queryInterface, Sequelize) {
    // Deletando a tabela 'testeUsuarios' caso ela exista
    await queryInterface.dropTable('testeUsuarios');
  }
};
