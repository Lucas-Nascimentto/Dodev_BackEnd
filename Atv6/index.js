function mostrarcep(){
    // Pega o valor do campo de input com id "cep"
    let cep = document.getElementById("cep").value;
    
    // Faz uma requisição para a API do viacep com o valor do cep
    fetch("https://viacep.com.br/ws/" + cep + "/json")
    
    // Primeira etapa do fetch: recebe a resposta da requisição
    .then(response => {
        // Verifica se a resposta foi bem-sucedida
        if(!response.ok){
            // Se não for, lança um erro
            throw new Error("resposta de rede não foi bem sucedida");
        }
        // Converte a resposta para JSON e a retorna
        return response.json();
    })
    
    // Segunda etapa do fetch: trabalha com os dados convertidos em JSON
    .then(data => {
        // Exibe os dados no console para depuração
        console.log(data);
        
        // Cria uma string contendo o endereço formatado com as informações retornadas da API
        let endereco = `CEP: ${data.cep}<br>Logradouro: ${data.logradouro}<br>Bairro: ${data.bairro}<br>Cidade: ${data.localidade}<br>Estado: ${data.uf}`;
        
        // Define o conteúdo HTML do elemento com id "resultado" para exibir o endereço formatado
        document.getElementById("resultado").innerHTML = endereco;
    })
    
    // Captura qualquer erro ocorrido durante a requisição ou no processamento dos dados
    .catch(error => {
        // Exibe o erro no console para depuração
        console.error("erro de requisição", error);
        
        // Define o texto do elemento com id "resultado" para informar que houve um erro
        document.getElementById("resultado").innerText = "Erro ao buscar o CEP.";
    });
}
