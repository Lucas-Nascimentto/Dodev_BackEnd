const {Sequelize} = require('sequelize'); // Importando o Sequelize

// Criando uma nova instância do Sequelize com a configuração do banco de dados
const sequelize = new Sequelize('Atv4', 'root', 'Lucas46xr*', {
    host: 'localhost', // Endereço do servidor do banco de dados
    port: 3306, // Porta do banco de dados
    dialect: 'mysql', // Dialeto do banco de dados (MySQL)
    timezone: '-03:00' // Configurando o fuso horário para GMT-3 (Horário de Brasília)
});

module.exports = sequelize; // Exportando a instância do Sequelize
