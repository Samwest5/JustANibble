const S3 = require('aws-sdk/clients/s3');
const { AWSSecretKey, AWSAccessKeyId, BucketRegion, BucketName } = require('./config');
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new S3({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: BucketRegion
});

exports.s3upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: BucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const imageKey = req.body.recipeName + Date.now();
      req.body.image_path = imageKey;
      cb(null, imageKey);
    },
  })
});
