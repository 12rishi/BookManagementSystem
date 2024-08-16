const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileFormat = ["image/jpg", "image/jpeg", "image/png"];
    if (!fileFormat.includes(file.mimetype)) {
      cb(new Error("file format is not supported"));
      return;
    }
    cb(null, "./storage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
module.exports = {
  multer,
  storage,
};
