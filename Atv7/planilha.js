const axios = require("axios");
const {criarUsuario, deletarUsuario, alterarUsuario} = require('./app.usuarios');
const express = require("express");
const app = express();

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware de logging
const userLogger = (req, res, next) => {
    if (req.body && req.body.nome && req.body.senha) {
        console.log('Usuário recebido:', req.body);
    } else {
        console.log('Nenhum objeto de usuário encontrado na solicitação.');
    }
    next(); // Passa a requisição para o próximo middleware ou rota
};

// Aplicar middleware de delete
const userdelete = (req, res, next) => {
    const cpf = req.params.cpf;
    console.log(`Tentativa de deletar usuário com CPF: ${cpf}`);
    next();
};

// Aplicar middleware de update
const userUpdate = (req,res,next)=>{
    const cpf = req.params.cpf;
    console.log(`Tentativa de alterar usuário com CPF: ${cpf}`);
    next();
}

// Rodando na porta 3000
app.listen(3000, () =>{
    console.log("Rodando");
});


// Rota para login
app.post("/login", userLogger, (req, res) => {
    const { nome, senha } = req.body; // Extrai nome e senha do corpo da requisição
    login(nome, senha); // Chama a função de login com os dados fornecidos
    res.send('Requisição de login recebida.'); // Envia resposta de sucesso
});

// Rota para criação de usuário
app.post("/usuario", userLogger, (req, res) => {
    const { email, nome, senha, telefone, cpf } = req.body; // Extrai dados do corpo da requisição
    salvar(email, nome, senha, telefone, cpf); // Chama a função para salvar os dados do usuário
    criarUsuario(req.body); // Chama a função para criar um novo usuário com os dados fornecidos
    res.send('Requisição de criação de usuário recebida.'); // Envia resposta de sucesso
});

// Rota para deletar usuário por CPF
app.delete("/deletar/:cpf", userdelete, (req, res) => {
    const cpf = req.params.cpf; // Obtém o CPF a partir dos parâmetros da rota
    console.log("CPF recebido:", cpf); // Log para verificação do CPF recebido
    deletar(cpf); // Chama a função para deletar o usuário com o CPF fornecido
    res.send("Usuário deletado"); // Envia resposta de sucesso
});

// Rota para atualizar usuário por CPF
app.put("/alterar/:cpf", userUpdate, (req, res) => {
    const cpf = req.params.cpf; // Obtém o CPF a partir dos parâmetros da rota
    console.log("CPF recebido:", cpf); // Log para verificação do CPF recebido
    alterar(req.body, cpf); // Chama a função para atualizar o usuário com os dados fornecidos
    res.send("Usuário alterado"); // Envia resposta de sucesso
});

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
        // Chama a função deletarUsuario passando o CPF
        deletarUsuario(cpf);
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao deletar o registro:", error);
    });
}

// Função para mostrar as informações do Usuário através do seu cpf
function mostrarPorCpf(cpf) {
    // Faz uma requisição GET para buscar o usuário com o CPF especificado na API do SheetDB
    axios.get("https://sheetdb.io/api/v1/l4od0p7fwu35k/search?cpf=" + cpf)
    .then(response => {
        // Loga os dados do usuário se a requisição for bem-sucedida
        console.log(response.data);
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao buscar o registro:", error);
    });
}

// Função para mostrar uma lista de Usuários e adicionar no banco de dados
function mostrarUsuarios() {
    // Faz uma requisição GET para buscar todos os usuários na API do SheetDB
    axios.get("https://sheetdb.io/api/v1/l4od0p7fwu35k")
    .then(response => {
        // Loga os dados de todos os usuários se a requisição for bem-sucedida
        console.log(response.data);
        const usuarios = response.data;
        // Para cada usuário, chama a função criarUsuario
        usuarios.forEach(x => {
            criarUsuario(x);
        });
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao buscar o registro:", error);
    });
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
            if (usuario.nome == nome & usuario.senha == senha) {
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
    // Faz uma requisição PUT para atualizar os dados do usuário com o CPF especificado na API do SheetDB
    axios.put(`https://sheetdb.io/api/v1/l4od0p7fwu35k/cpf/${cpf}`, {
        "data": {
            "email": dadosDoUsuario.email,
            "nome": dadosDoUsuario.nome,
            "senha": dadosDoUsuario.senha,
            "telefone": dadosDoUsuario.telefone,
            "cpf": dadosDoUsuario.cpf
        } 
    })
    .then(response => {
        // Loga uma mensagem de sucesso se a requisição for bem-sucedida
        console.log("Registro alterado com sucesso:", response.data);
        const dadosDoUsuario = response.data;
        // Chama a função alterarUsuario passando os novos dados do usuário e o CPF
        alterarUsuario(dadosDoUsuario, cpf);
    })
    .catch(error => {
        // Loga um erro caso a requisição falhe
        console.error("Erro ao alterar o registro:", error);
    });
}

//deletar("12897987");
//salvar("julia1", "julia", 123, 75991110069, 12897987);
//salvar("lucas", "lucas", 123, 75991110069, 12897987);
//mostrarPorCpf(12897987);
//mostrarUsuarios();
//login("lucas", 123);
