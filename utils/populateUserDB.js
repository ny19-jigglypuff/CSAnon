const request = require('superagent');
const { Pool } = require('pg');

const db = new Pool({
  user: 'rdijnfia',
  password: 'kOCId0HmwNJ8mOSTy6gk4Ij8a4nAAFz1',
  host: 'ruby.db.elephantsql.com',
  database: 'rdijnfia',
  port: 5432,
});

//  password = kOCId0HmwNJ8mOSTy6gk4Ij8a4nAAFz1

// const db = require('../src/server/models/elephantsql');

const baseUrl = 'https://pokeapi.co/api/v2/';

request
  .get(`${baseUrl}pokemon?limit=1000`)
  .set('Accept', 'application/json')
  //   .then((res) => res.json())
  .then(async (res) => {
    res.body.results.map((pokemon, index) => {
      pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      return pokemon;
    });
    // console.log(res.body.results);

    const pokemonList = res.body.results;

    for (let i = 0; i < pokemonList.length; i++) {
      const { sprite, name } = pokemonList[i];
      const queryString = `INSERT INTO users (pic_url, username) VALUES ('${sprite}','${name}');`;
      await db.query(queryString);
    }
    console.log('WE DID IT!');
  });
