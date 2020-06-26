const request = require('superagent');

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
    .set('User-Agent', 'BBB') // Authorization: token OAUTH-TOKEN
    .set('Authorization', 'token ' + accessToken); // Authorization: token OAUTH-TOKEN
};

module.exports = { requestToken, requestUser };
