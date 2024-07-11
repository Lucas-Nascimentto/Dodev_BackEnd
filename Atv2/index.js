const express = require('express'); // Importa o módulo Express
const app = express(); // Cria uma instância da aplicação Express

app.use(express.json()); // Middleware para interpretar requisições com JSON

app.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor inicializado com sucesso!"); // Exibe uma mensagem no console indicando que o servidor foi inicializado
});

const veiculos = []; // Inicializa uma lista vazia para armazenar os veículos

app.get('/veiculos', (req, res) => { // Define um endpoint GET na rota '/veiculos'
    res.status(200).send({veiculos}); // Envia a lista de veículos com status 200 (OK)
});

app.get('/veiculos/:id', (req, res) => { // Define um endpoint GET na rota '/veiculos/:id' para obter um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    res.status(200).send(veiculos[idUrl]); // Envia o veículo correspondente ao ID com status 200 (OK)
});

app.post('/veiculos', (req, res) => { // Define um endpoint POST na rota '/veiculos'
    veiculos.push(req.body); // Adiciona um novo veículo à lista
    res.status(200).send("Veículo adicionado com sucesso!"); // Envia uma mensagem indicando que o veículo foi adicionado com sucesso com status 200 (OK)
});

app.put('/veiculos/:id', (req, res) => { // Define um endpoint PUT na rota '/veiculos/:id' para atualizar um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    veiculos[idUrl] = req.body; // Atualiza o veículo correspondente ao ID com os dados do corpo da requisição
    res.status(200).send("Alteração feita com sucesso!"); // Envia uma mensagem indicando que a alteração foi feita com sucesso com status 200 (OK)
});

app.delete('/veiculos/:id', (req, res) => { // Define um endpoint DELETE na rota '/veiculos/:id' para deletar um veículo específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    veiculos.splice(idUrl, 1); // Remove o veículo correspondente ao ID da lista
    res.status(200).send("Veículo deletado com sucesso!"); // Envia uma mensagem indicando que o veículo foi deletado com sucesso com status 200 (OK)
});
