const request = require('superagent');
const { Pool, Connection } = require('pg');

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
let currentID = 1

request
  .get(`${baseUrl}pokemon?limit=1000`)
  .set('Accept', 'application/json')
  //   .then((res) => res.json())

  // JUMP FROM 807 TO 1001
  .then(async (res) => {
    res.body.results.map((pokemon) => {
      if (currentID === 808) currentID = 10001
      pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentID}.png`;
      currentID++
      return pokemon;
    });
    // console.log(res.body.results);

    const pokemonList = res.body.results;
    let stars = '*'

    for (let i = 0; i < pokemonList.length; i++) {
      if (i % 25 === 0) console.log(stars += "*")
      const { sprite, name } = pokemonList[i];
      const queryString = `UPDATE users SET pic_url = '${sprite}', username = '${name}' WHERE username = '${name}';`;
      await db.query(queryString);
    }
    console.log('WE DID IT!');
  });
