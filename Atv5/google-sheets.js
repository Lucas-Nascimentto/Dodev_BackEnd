const { google } = require('googleapis');
const fs = require('fs');

// Carregar as credenciais do arquivo JSON
const CREDENTIALS = JSON.parse(fs.readFileSync('credentials.json'));

// Configurar a autenticação
const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
);

// Conectar à API do Google Sheets
const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = '1gagMb6n1r_R3tJIMC9MUgDzySX88PskuxgH4gxP4Ej8'; // Substitua pelo ID da sua planilha
const SHEET_NAME = 'Página1'; // Substitua pelo nome da sua planilha

// Função para inserir dados na planilha
async function inserirDados(email, nome, senha, telefone, cep) {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:E1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[email, nome, senha, telefone, cep]],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Dados inseridos:', response.data.updates.updatedRange);
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
  }
}

// Função para ler dados da planilha e criar objetos de usuário
async function lerDados() {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:E`,
  };

  try {
    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values;

    if (rows.length) {
      const usuarios = rows.map((row) => ({
        email: row[0],
        nome: row[1],
        senha: row[2],
        telefone: row[3],
        cep: row[4],
      }));
      console.log('Dados lidos:', usuarios);
      return usuarios;
    } else {
      console.log('Nenhum dado encontrado.');
      return [];
    }
  } catch (err) {
    console.error('Erro ao ler dados:', err);
  }
}

// Exemplo de uso
(async () => {
  await inserirDados('exemplo@email.com', 'Nome Exemplo', 'senha123', '123456789', '12345-678');
  const usuarios = await lerDados();
  console.log(usuarios);
})();
