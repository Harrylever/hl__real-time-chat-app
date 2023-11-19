const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const appMailClientId = process.env.APP_MAIL_CLIENT_ID;
const appMailClientSecret = process.env.APP_MAIL_CLIENT_SECRET;
const appMailAccessToken = process.env.APP_MAIL_ACCESS_TOKEN;
const appMailRefreshToken = process.env.APP_MAIL_REFRESH_TOKEN;
const appMailClientEmail = process.env.APP_MAIL_CLIENT_EMAIL;
const appAuthClientId = process.env.APP_AUTH_CLIENT_ID;
const appAuthClientEmail = process.env.APP_AUTH_CLIENT_EMAIL;
const appAuthClientSecret = process.env.APP_AUTH_CLIENT_SECRET;

module.exports = {
  port,
  mongoUri,
  jwtSecretKey,
  appMailClientId,
  appMailClientSecret,
  appMailAccessToken,
  appMailRefreshToken,
  appMailClientEmail,
  appAuthClientId,
  appAuthClientEmail,
  appAuthClientSecret,
};
