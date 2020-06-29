const { Pool } = require('pg');

// was causing authentication errors with the connectionString for some reason
// needed the information added explicitly
const db = new Pool({
  user: 'sxxfhsmp',
  password: '24uEPIYvk4WgTARJKU3CWztooRTxxlNV',
  host: 'ruby.db.elephantsql.com',
  database: 'sxxfhsmp',
  port: 5432,
});

const createUsersTableQuery = `CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR,
  pic_url VARCHAR
)`;

const createMessagesTableQuery = `CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  timestamp DATE,
  user_id INTEGER REFERENCES users(user_id), 
  message VARCHAR
)`;

db.query(createUsersTableQuery);
db.query(createMessagesTableQuery);

/*check which tables exist in the db with:
SELECT table_name
  FROM information_schema.tables
 WHERE table_schema='public'
   AND table_type='BASE TABLE';
*/