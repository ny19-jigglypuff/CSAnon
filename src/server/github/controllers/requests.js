const request = require('superagent');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PROJECT_NAME = process.env.PROJECT_NAME;

const requestToken = (code) => {
  return request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    })
    .set('Accept', 'application/json');
}; 

const requestUser = (result, response) => {
  const { access_token, scope } = result.body;
  console.log('user scope', scope);
  // console.log('access token:', access_token);
  response.locals.access_token = access_token;
  return (
    request
      .get('https://api.github.com/user')
      // User-Agent header is required by GitHub OAuth, and value is project name or client_id
      .set('User-Agent', PROJECT_NAME)
      // Authorization: token OAUTH-TOKEN <- space after token is VERY important
      .set('Authorization', 'token ' + access_token)
  );
};

const checkMembership = (githubHandle, access_token) => {
  const baseURL = 'https://api.github.com';
  const org = 'CodesmithLLC';
  //   /user/memberships/orgs?state=active
  // /user GET request returns response correctly
  // const route = `/user/orgs`;
  const route = `/orgs/${org}/members/${githubHandle}`;
  console.log(baseURL + route);
  return (
    request
      .get(baseURL + route)
      // User-Agent header is required by GitHub OAuth, and value is project name or client_id
      .set('User-Agent', PROJECT_NAME)
      // Authorization: token OAUTH-TOKEN <- space after token is VERY important
      .set('Authorization', 'token ' + access_token)
  );
};

module.exports = { requestToken, requestUser, checkMembership };
