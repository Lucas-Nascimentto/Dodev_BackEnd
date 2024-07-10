
const express = require('express'); // Importa o módulo Express
const app = express(); // Cria uma instância da aplicação Express

app.use(express.json()); // Middleware para interpretar requisições com JSON

app.listen(3002, () => { // Inicia o servidor na porta 3002
    console.log("Servidor iniciado"); // Exibe uma mensagem no console indicando que o servidor foi iniciado
});


const lista = []; // Inicializa uma lista vazia para armazenar os usuários

app.get('/usuarios', (req, res) => { // Define um endpoint GET na rota '/usuarios'
   res.status(200).send(lista); // Envia a lista de usuários com status 200 (OK)
   console.log('Lista enviada'); // Exibe uma mensagem no console indicando que a lista foi enviada
});

app.post('/usuarios', (req, res) => { // Define um endpoint POST na rota '/usuarios'
    const usuario = req.body; // Extrai o usuário do corpo da requisição
    lista.push(usuario); // Adiciona o novo usuário à lista
    res.status(200).send(req.body); // Envia o usuário adicionado como resposta com status 200 (OK)
    console.log('Usuário adicionado'); // Exibe uma mensagem no console indicando que um usuário foi adicionado
});

app.get('/usuarios/:id', (req, res) => { // Define um endpoint GET na rota '/usuarios/:id' para obter um usuário específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    req.body = lista[idUrl]; // Define o corpo da requisição como o usuário correspondente ao ID
    res.status(200).send(req.body); // Envia o usuário encontrado como resposta com status 200 (OK)
    console.log("Usuário encontrado"); // Exibe uma mensagem no console indicando que o usuário foi encontrado
});

app.put('/usuarios/:id', (req, res) => { // Define um endpoint PUT na rota '/usuarios/:id' para atualizar um usuário específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    lista[idUrl] = req.body; // Atualiza o usuário correspondente ao ID com os dados do corpo da requisição
    res.status(200).send(lista[idUrl]); // Envia o usuário atualizado como resposta com status 200 (OK)
});

app.delete('/usuarios/:id', (req, res) => { // Define um endpoint DELETE na rota '/usuarios/:id' para deletar um usuário específico
    const idUrl = parseInt(req.params.id); // Converte o parâmetro de URL 'id' para um inteiro
    lista.splice(idUrl, 1); // Remove o usuário correspondente ao ID da lista
    res.status(200).send("Remoção feita"); // Envia uma mensagem indicando que a remoção foi feita com sucesso com status 200 (OK)
});
