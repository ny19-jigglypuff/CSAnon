# ComplainSmith
An anonymous board to ask for help, coding or otherwise.

--MVP--
Front End
    - Login Page / Signed Out Landing Page
        - Click to log in with GitHub OAuth
            - Do they give us their handle? (Does github give the username)
                - Check handle against whitelist (held in backend)
    - Avatar Login Page / Signed In User Landing Page
        - User chooses anonymous (name || picture) (from selection, or reroll)
    - Chat Page
        - Protected if unauthorized
        - Shows a history of chat messages
        - Shows user input area
        - Shows anonimized users (random name || pokemon pic, new each session)
        - Include specific logout button (remove the JWT token)
Back End
    - Ensure no duplicate names or pictures at any given time || name / picture cooldown
    - Control current sessions
    - Users logged in / out as sockets
    - Pass messages as socket messages
    - Send new messages to storage (db)
Database
    - Current users as name/picture
    - Whitelist of allowable users
    - Message history

Schema 


MESSAGE:

--------------------------------------------
PIC                              TIMESTAMP
USERNAME                         MESSAGE
--------------------------------------------

TABLE whitelist
    COLUMN github_handle varchar

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

REDIS (key/value pairs) - Stores current active users (check against when assigning new users)



--Stretch--
Front End
    - Multiple rooms
    - Dirty word censor? (as an option)

Back End

Databases

Cookie Timeout 
    - A week? (Can be determined at a later point)

Content moderation
    - Logging malicious IP addresses / github for blacklist