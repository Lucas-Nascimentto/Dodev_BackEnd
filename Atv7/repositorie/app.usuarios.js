const { where } = require('sequelize');
const sequelize = require('./database');
const usuario = require('./usuarios');

// Função assíncrona para criar um novo usuário no banco de dados
async function criarUsuario(dados) {
    try {
        // Autentica a conexão com o banco de dados
        await sequelize.authenticate();
        // Sincroniza o modelo 'usuario' com o banco de dados
        await usuario.sync();

        // Cria um novo registro de usuário com os dados fornecidos
        const novoUsuario = await usuario.create({
            email: dados.email,
            nome: dados.nome,
            senha: dados.senha,
            telefone: dados.telefone,
            cpf: dados.cpf
        });
    } catch (error) {
        // Loga um erro caso ocorra algum problema durante a execução
        console.log("Deu erro:", error);
    } finally {
        // Fecha a conexão com o banco de dados
        sequelize.close();
    }
}

// Função assíncrona para deletar um usuário do banco de dados através do seu CPF
async function deletarUsuario(cpf) {
    try {
        // Autentica a conexão com o banco de dados
        await sequelize.authenticate();
        // Sincroniza o modelo 'usuario' com o banco de dados
        await usuario.sync();
        
        // Deleta o registro do usuário que possui o CPF especificado
        await usuario.destroy({
            where: {
                cpf: cpf
            }
        });
    } catch (error) {
        // Loga um erro caso ocorra algum problema durante a execução
        console.log("Deu erro:", error);
    } finally {
        // Fecha a conexão com o banco de dados
        sequelize.close();
    }
}

// Função assíncrona para alterar os dados de um usuário no banco de dados através do seu CPF
async function alterarUsuario(dados, cpf) {
    try {
        // Autentica a conexão com o banco de dados
        await sequelize.authenticate();
        // Sincroniza o modelo 'usuario' com o banco de dados
        await usuario.sync();
        
        // Atualiza o registro do usuário com o CPF especificado com os novos dados fornecidos
        const alterarUsuario = await usuario.update({
            email: dados.Email,
            nome: dados.Nome,
            senha: dados.Senha,
            telefone: dados.Telefone,
            cpf: dados.Cpf
        }, {
            where: {
                cpf: cpf
            }
        });
    } catch (error) {
        // Loga um erro caso ocorra algum problema durante a execução
        console.log("Deu erro:", error);
    } finally {
        // Fecha a conexão com o banco de dados
        sequelize.close();
    }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarUsuario, deletarUsuario, alterarUsuario };
