const request = require('superagent');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const requestToken = (code) => {
  return request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    })
    .set('Accept', 'application/json');
};

const requestUser = (result) => {
  const data = result.body;
  const accessToken = data.access_token;

  return request
    .get('https://api.github.com/user')
    // User-Agent header is required by GitHub OAuth, and value is project name or client_id
    .set('User-Agent', 'BBB')
    // Authorization: token OAUTH-TOKEN <- space after token is VERY important
    .set('Authorization', 'token ' + accessToken); 
};

module.exports = { requestToken, requestUser };
