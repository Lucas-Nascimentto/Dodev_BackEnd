'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Função 'up' para inserir registros na tabela 'testeUsuarios'
  async up (queryInterface, Sequelize) {
    // Inserindo um registro na tabela 'testeUsuarios'
    await queryInterface.bulkInsert('testeUsuarios', [
      {
        email: "lucas@.com", // Valor para a coluna 'email'
        nome: "lucas", // Valor para a coluna 'nome'
        senha: "sdfsdfe", // Valor para a coluna 'senha'
        telefone: "81922440089", // Valor para a coluna 'telefone'
        endereco: "rua ali de cá" // Valor para a coluna 'endereco'
      }
    ]);
  },

  // Função 'down' para deletar registros da tabela 'testeUsuarios'
  async down (queryInterface, Sequelize) {
    // Deletando todos os registros da tabela 'testeUsuarios'
    await queryInterface.bulkDelete('testeUsuarios', null, {});

  // 'testeUsuarios': nome da tabela da qual os registros serão excluídos
  // null: exclui todos os registros da tabela
  // {}: objeto de opções (neste caso, está vazio, usando comportamento padrão)
  }
};
