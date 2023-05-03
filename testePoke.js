const express = require('express');
const port = 3000;

const axios = require('axios');

async function buscarEndereco(number) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=37${number}`);
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível obter o nome desse pokemon');
  }
}

// Exemplo de uso da função buscarEndereco
buscarEndereco(>'20000')
  .then(endereco => console.log(endereco))
  .catch(error => console.error(error.message));

module.exports = {
    buscarEndereco
}


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});