const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  nibbleHost:     process.env.HOST,
  nibbleUser:     process.env.USER,
  nibblePassword: process.env.PASSWORD,
  nibbleDatabase: process.env.DATABASE,
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretKey:   process.env.AWSSecretKey
};