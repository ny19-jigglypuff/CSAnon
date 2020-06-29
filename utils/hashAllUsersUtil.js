const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// was causing authentication errors with the connectionString for some reason
// needed the information added explicitly
const db = new Pool({
  user: 'sxxfhsmp',
  password: '24uEPIYvk4WgTARJKU3CWztooRTxxlNV',
  host: 'ruby.db.elephantsql.com',
  database: 'sxxfhsmp',
  port: 5432,
});

/*
STEP ONE:
    - Get all users from whitelist

STEP TWO:
    - Hash all usernames

STEP THREE:
    - Push each hashed username into hash table    
*/

// STEP ONE
const getAllUsers = async () => {
  // This was a connection to a plaintext whitelist
  // recommend loading and parsing a local csv
};

const SALT_ROUNDS = 8;

// STEP TWO
const hashUser = async (username) => {
  const hash = await bcrypt.hash(username, SALT_ROUNDS);
  return hash;
};

// STEP THREE
const insertUserIntoDB = async (hashedUser) => {
  try {
    const queryString = `INSERT INTO hash_table (bcrypt_hash) VALUES ('${hashedUser}')`;
    return await db.query(queryString);
  } catch (err) {
    console.error(err);
  }
};

// PUTTING IT ALL TOGETHER

const allTogether = async () => {
  let waiting = '.';
  // get all the users, save all the whitelist users in an array
  const usersArray = await getAllUsers();
  // loop through the array
  for (let i = 0; i < usersArray.length; i++) {
    // get the github handle of the user at the index we're looping through
    const { github_handle } = usersArray[i];
    // hash the username of that github handle
    const hashedUsername = await hashUser(github_handle);
    // take the hashed username, and insert it into the database
    // await action in order to slow the db calls and prevent throttling errors
    await insertUserIntoDB(hashedUsername);
    console.log(waiting);
    waiting += '.';
  }
};

allTogether();

/*

RESPONSE = [
    {github_handle: value}
]

TABLE hash_table = {
    COLUMN bcrypt_hash varchar UNIQUE
}

TABLE whitelist = {
    COLUMN github_handle varchar
}

*/
