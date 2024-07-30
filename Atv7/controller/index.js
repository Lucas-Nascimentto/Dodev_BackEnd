const {criarUsuario, deletarUsuario, alterarUsuario} = require('../repositorie/app.usuarios');
const express = require("express");
const app = express();
const {salvar, deletar, mostrarPorCpf, alterar, login, mostrarUsuarios} = require('../service/sheetsdb');

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
    res.status(200).send(req.body); // Envia resposta de sucesso
});

// Rota para criação de usuário
app.post("/usuario", userLogger, (req, res) => {
    const { email, nome, senha, telefone, cpf } = req.body; // Extrai dados do corpo da requisição
    salvar(email, nome, senha, telefone, cpf); // Chama a função para salvar os dados do usuário
    criarUsuario(req.body); // Chama a função para criar um novo usuário com os dados fornecidos
    res.status(200).send(req.body); // Envia resposta de sucesso
});

// Rota para deletar usuário por CPF
app.delete("/deletar/:cpf", userdelete, (req, res) => {
    const cpf = req.params.cpf; // Obtém o CPF a partir dos parâmetros da rota
    deletar(cpf); // Chama a função para deletar o usuário com o CPF fornecido
    deletarUsuario(cpf); // Chama a função para deletar o usuário com o CPF fornecido no banco de dados
    res.status(200); // Envia resposta de sucesso
});

// Rota para atualizar usuário por CPF
app.put("/alterar/:cpf", userUpdate, (req, res) => {
    const cpf = req.params.cpf; // Obtém o CPF a partir dos parâmetros da rota
    alterar(req.body, cpf); // Chama a função para atualizar o usuário com os dados fornecidos
    alterarUsuario(req.body, cpf); // Chama a função para atualizar o usuário com os dados fornecidos no banco de dados
    res.status(200).send(req.body); // Envia resposta de sucesso
});

app.get("/usuarios", async (req, res) => {
    try {
        // Espera a função mostrarUsuarios para obter os dados
        const resposta = await mostrarUsuarios();
        // Envia os dados como resposta
        res.status(200).send(resposta);
    } catch (error) {
        // Envia uma resposta de erro caso ocorra uma falha
        res.status(500).send("Erro ao buscar os registros");
    }
});

app.get("/info/:cpf", async (req, res) =>{
    try{
        const cpf = req.params.cpf;
        // Espera a função mostrarPorCpf para obter os dados
        let resposta = await mostrarPorCpf(cpf);
         // Envia os dados como resposta
        res.status(200).send(resposta); 
    }
    catch(error){
        // Envia uma resposta de erro caso ocorra uma falha
        res.status(500).send("Erro ao buscar os registros");
    }
})

