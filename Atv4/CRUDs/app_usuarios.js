const sequelize = require('../config/database'); // Importando a configuração do banco de dados
const Usuario = require('../models/usuarios'); // Importando o modelo de Usuário

async function main(){
    try{
        await sequelize.authenticate(); // Autenticando a conexão com o banco de dados
        await Usuario.sync(); // Sincronizando o modelo de Usuário com o banco de dados
    
        // Criando um novo usuário
        const novoUsuario = await Usuario.create({
            email: 'julia@hotmail.com',
            nome: 'Lucas',
            senha: 'Luc45#',
            telefone: '8199266-0987',
            endereco: 'Rua botafogo, n° 465'
        });
        console.log("Criado com sucesso", novoUsuario.toJSON());
    
        // Lendo todos os usuários
        const lerUsuarios = await Usuario.findAll();
        console.log("Lista de usuários:", lerUsuarios.map((x) => x.toJSON()));

        // Alterando a senha de um usuário específico
        const alterarUsuario = await Usuario.findByPk(id);
        await alterarUsuario.update({senha: 'outraSenha'});
        console.log("Alteração feita com sucesso:", alterarUsuario.toJSON());

        // Deletando um usuário específico
        const deletarUsuario = await Usuario.findByPk(id);
        await deletarUsuario.destroy();
        console.log("Usuário deletado com sucesso.", deletarUsuario.toJSON());

    } catch(error){
        console.log("Erro ao conectar com o banco de Dados: ", error); // Tratamento de erro
    } finally {
        sequelize.close(); // Fechando a conexão com o banco de dados
    }
}

main(); // Executando a função principal
