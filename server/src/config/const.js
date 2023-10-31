const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const gAuthAccessToken = process.env.ACCESS_TOKEN;
const gAuthRefreshToken = process.env.REFRESH_TOKEN;
const clientEmail = process.env.CLIENT_EMAIL;

module.exports = {
  port,
  mongoUri,
  jwtSecretKey,
  clientId,
  clientSecret,
  gAuthAccessToken,
  gAuthRefreshToken,
  clientEmail,
};
