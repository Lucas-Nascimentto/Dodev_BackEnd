const express = require('express'); // Importa o módulo Express
const app = express(); // Cria uma instância da aplicação Express

const db = require('./dataBase'); // Importa o módulo de banco de dados
const dbInstancia = db.veiculosDatabase(); // Cria uma instância do banco de dados de veículos

app.use(express.json()); // Middleware para interpretar requisições com JSON

app.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor inicializado com sucesso!"); // Exibe uma mensagem no console indicando que o servidor foi inicializado
});

app.get('/veiculos', async (req, res) => { // Define um endpoint GET na rota '/veiculos'
    res.status(200).send(await dbInstancia.list()); // Envia a lista de veículos com status 200 (OK)
});

app.get('/veiculos/:id', async (req, res) => { // Define um endpoint GET na rota '/veiculos/:id' para obter um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    res.status(200).send(await dbInstancia.get(idUrl)); // Envia o veículo correspondente ao ID com status 200 (OK)
});

app.post('/veiculos', async (req, res) => { // Define um endpoint POST na rota '/veiculos'
    await dbInstancia.insert(req.body); // Adiciona um novo veículo à lista
    res.status(200).send("Veículo adicionado com sucesso!"); // Envia uma mensagem indicando que o veículo foi adicionado com sucesso com status 200 (OK)
});

app.put('/veiculos/:id', async (req, res) => { // Define um endpoint PUT na rota '/veiculos/:id' para atualizar um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    await dbInstancia.update(req.body, idUrl); // Atualiza o veículo correspondente ao ID com os dados do corpo da requisição
    res.status(200).send("Alteração feita com sucesso!"); // Envia uma mensagem indicando que a alteração foi feita com sucesso com status 200 (OK)
});

app.delete('/veiculos/:id', async (req, res) => { // Define um endpoint DELETE na rota '/veiculos/:id' para deletar um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    await dbInstancia.delete(idUrl); // Remove o veículo correspondente ao ID do banco de dados
    res.status(200).send("Veículo deletado com sucesso!"); // Envia uma mensagem indicando que o veículo foi deletado com sucesso com status 200 (OK)
});
