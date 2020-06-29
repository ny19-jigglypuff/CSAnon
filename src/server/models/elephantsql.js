const { Pool } = require('pg');
const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};