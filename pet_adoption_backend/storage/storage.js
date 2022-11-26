const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");

require("dotenv").config();

const { AWSSecretKey, AWSAccessKeyId } = process.env;

aws.config.update({
  secretAccessKey: AWSSecretKey,
  accessKeyId: AWSAccessKeyId,
  region: "eu-west-2",
});

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
  },
  region: "eu-west-2",
});

module.exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pet-app-images",

    key: function (req, file, cb) {
      const fileName =
        "pet-img-" + Date.now() + "." + file.originalname.split(".")[1];
      req.fileName = fileName;
      cb(null, fileName);
    },
  }),
});
