const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { query } = require('express');

const db = new Pool({
  user: 'rdijnfia',
  password: 'kOCId0HmwNJ8mOSTy6gk4Ij8a4nAAFz1',
  host: 'ruby.db.elephantsql.com',
  database: 'rdijnfia',
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
  const queryString = `SELECT * FROM whitelist`;
  const response = await db.query(queryString);
  if (response.rows.length) {
    const users = response.rows;
    return users;
  } else {
    console.error('error with select from whitelist');
  }
};

// const SECRET_STRING = 'BESIK100%'
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
    // call third function
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
