const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  port,
  mongoUri,
  jwtSecretKey,
};
