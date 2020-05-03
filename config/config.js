const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  nibbleHost:     process.env.HOST,
  nibbleUser:     process.env.DBUSER,
  nibblePassword: process.env.PASSWORD,
  nibbleDatabase: process.env.DATABASE,
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretKey:   process.env.AWSSecretKey,
  BucketName:     process.env.BUCKETNAME,
  BucketRegion:   process.env.BUCKETREGION,
  TokenSecret:    process.env.TOKENSECRET,
  SaltRounds:     Number(process.env.SALTROUNDS),
};