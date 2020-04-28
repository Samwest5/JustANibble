const S3 = require('aws-sdk/clients/s3');
const { AWSSecretKey, AWSAccessKeyId } = require('./config');
const BUCKETNAME = "nibble-bucket";
const REGION = "us-east-2";

let s3 = new S3({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey
});

module.exports = s3;