//npm init -y
//npm install axios
//node .\testeCEP.js

const axios = require('axios');

async function buscarEndereco(number) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=37${number}`);
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível obter o endereço a partir do CEP informado');
  }
}

// Exemplo de uso da função buscarEndereco
buscarEndereco('88113-000')
  .then(endereco => console.log(endereco))
  .catch(error => console.error(error.message));

module.exports = {
    buscarEndereco
}