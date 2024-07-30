const axios = require("axios");
// Função para salvar o Usuário
function salvar(email, nome, senha, telefone, cpf) {
    // Faz uma requisição POST para salvar os dados do usuário na API do SheetDB
    axios.post("https://sheetdb.io/api/v1/l4od0p7fwu35k", {
        "data": {
            "email": email,
            "nome": nome,
            "senha": senha,
            "telefone": telefone,
            "cpf": cpf
        } 
    });
}

// Função para deletar o Usuário através do seu cpf
function deletar(cpf) {
    // Faz uma requisição DELETE para deletar o usuário com o CPF especificado na API do SheetDB
    axios.delete("https://sheetdb.io/api/v1/l4od0p7fwu35k/cpf/" + cpf)
    .then(response => {
        // Loga uma mensagem de sucesso se a requisição for bem-sucedida
        console.log("Registro deletado com sucesso:", response.data);
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao deletar o registro:", error);
    });
}

// Função para mostrar as informações do Usuário através do seu cpf
 async function mostrarPorCpf(cpf) {
    try{
         // Faz uma requisição GET para buscar o usuário na API do SheetDB com o cpf informado
        const response =  await axios.get("https://sheetdb.io/api/v1/l4od0p7fwu35k/search?cpf=" + cpf);
        // retorna os dados do usuário se a requisição for bem-sucedida
        return response.data;
    }
    catch(error){
        // Loga um erro caso a requisição falhe
        console.error("Erro ao buscar o registro:", error);
        throw error;
    }
    }

// Função para mostrar uma lista de Usuários e adicionar no banco de dados
async function mostrarUsuarios() {
    try {
        // Faz uma requisição GET para buscar todos os usuários na API do SheetDB
        const response = await axios.get("https://sheetdb.io/api/v1/l4od0p7fwu35k");
        // retorna os dados de todos os usuários se a requisição for bem-sucedida
        return response.data;
    } catch (error) {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao buscar o registro:", error);
        throw error;
    }
}

// Função para fazer login através do seu nome e senha
function login(nome, senha) {
    // Faz uma requisição GET para buscar todos os usuários na API do SheetDB
    axios.get("https://sheetdb.io/api/v1/l4od0p7fwu35k")
    .then(response => {
        const usuarios = response.data;
        let achei = false;
        // Verifica se o nome e senha fornecidos correspondem a algum usuário
        usuarios.forEach(usuario => {
            if (usuario.nome == nome && usuario.senha == senha) {
                console.log(usuario); 
                achei = true;
            }
        });
        // Se nenhum usuário for encontrado, loga uma mensagem de erro
        if (achei == false) {
            console.log("Registro não cadastrado.");
        }
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao buscar o registro:", error);
    });
}

// Função para alterar o Usuário através do seu cpf, recebendo o body como parâmetro para alterar o usuário
function alterar(dadosDoUsuario, cpf) {
    console.log(dadosDoUsuario);
    // Faz uma requisição PUT para atualizar os dados do usuário com o CPF especificado na API do SheetDB
    axios.put("https://sheetdb.io/api/v1/l4od0p7fwu35k/cpf/" + cpf, {
        
            "email": dadosDoUsuario.Email,
            "nome": dadosDoUsuario.Nome,
            "senha": dadosDoUsuario.Senha,
            "telefone": dadosDoUsuario.Telefone,
            "cpf": dadosDoUsuario.Cpf
    })
    .then(response => {
        // Loga uma mensagem de sucesso se a requisição for bem-sucedida
        console.log("Registro alterado com sucesso:", response.data);
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao alterar o registro:", error);
    });
}

module.exports = {salvar, deletar, mostrarPorCpf, alterar, login, mostrarUsuarios}