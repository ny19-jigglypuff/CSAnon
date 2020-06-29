# CSAnon
An anonymous board to ask for help, coding or otherwise.

WELCOME, ITERATORS!

In order to work on this project, you're going to need a few things:

1. A Postgres server (either local or cloud)

2. A Redis server (we ran a local instance, see https://redis.io/topics/quickstart )

3. A .env file on the root directory, which has the following:

DB_URL=postgres:\<your postgres instance>

CLIENT_ID=\<the client ID for your github Oauth>

CLIENT_SECRET=\<the client secret for your github Oauth>

JWT_SECRET=\<A random string of your choosing>

PROJECT_NAME=\<your github project name>

4. On your github Oauth, set the redirect url to localhost:8080/auth/callback

5. Load a csv with the list of allowable usernames, complete logic for the hashAllUsersUtil file.  Run this util to populate your db with the hashed usernames.

6. Run populateUserDB to fill the users table with pokemon names and urls.


POSTGRES SERVER:

Schemas:


MESSAGE:

--------------------------------------------

PIC                              TIMESTAMP

USERNAME                         MESSAGE

--------------------------------------------

TABLE hash_list
    COLUMN bcrypt_hash varchar

TABLE messages
    COLUMN id int PRIMARY KEY
    COLUMN timestamp date
    COLUMN user_id int FOREIGN KEY
    COLUMN message varchar

TABLE users
    COLUMN user_id int PRIMARY KEY
    COLUMN username varchar
    COLUMN pic_url varchar

SERVERSIDE:

REDIS (key/value pairs) - 

Stores the following key / value pairs:

- username : 'true'
- socketID: username 


