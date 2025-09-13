// s3Upload.js
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// ✅ Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,       // from .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // from .env
  region: process.env.AWS_REGION || "us-east-1",
});

// ✅ Multer S3 storage setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // your bucket name
    acl: "public-read", // file will be publicly readable
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // Generate a unique file name
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, filename);
    },
  }),
});

// ✅ Middleware function to be called in controllers
// fieldName = the field name in form-data
const s3UploadMiddleware = (fieldName) => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName);

    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file provided" });
      }

      // Attach the file URL to req for controller use
      req.fileUrl = req.file.location; // multerS3 provides location
      next();
    });
  };
};

module.exports = s3UploadMiddleware;
