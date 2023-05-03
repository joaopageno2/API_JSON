//npm install jest

////Para configurar o jest como script de teste deve-se editar o 'package.json'
//No agrupamento "scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1"
//  }, alterar para:
//"scripts": {
//    "test": "jest"
//  },
//Para executar os testes:
//npm test

const axios = require('axios');
const { buscarEndereco } = require('./testePoke');

jest.mock('axios');

describe('Teste da função buscarPokemon', () => {
  it('Deve retornar o nome corretamente para um numero válido', async () => {

    const data = {
      count: 1281,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=38&limit=1',
      previous: 'https://pokeapi.co/api/v2/pokemon?offset=36&limit=1',
      results: [
        {
          name: 'ninetales',
          url: 'https://pokeapi.co/api/v2/pokemon/38/'
        }
      ]
    };


    axios.get.mockResolvedValue({ data });

    const endereco = await buscarEndereco('37');

    expect(endereco).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1&offset=37');
  });

  it('Deve lançar um erro para um CEP inválido', async () => {
    const errorMessage = 'Não foi possível obter o endereço a partir do CEP informado';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(buscarEndereco('12345-678')).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/12345-678/json/');
  });
});