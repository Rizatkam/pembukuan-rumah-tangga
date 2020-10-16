const multer = require("multer");
//const util = require("util");

/**
 * 
  "video/x-flv": ".flv"             //Flash
  "video/mp4": ".mp4"               //MPEG-4
  "application/x-mpegURL": ".m3u8"  //iPhone Index
  "video/MP2T": ".ts"               //iPhone Segment
  "video/3gpp": ".3gp"              //3GP Mobile
  "video/quicktime": ".mov"         //QuickTime
  "video/x-msvideo": ".avi"         //A/V Interleave
  "video/x-ms-wmv": ".wmv"          //Windows Media
 */
const fileObj = {
  "image/png": ".png",
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "video/mp4": ".mp4",
};

/**
 * Use this storage if not using external cloud storage, e.g google cloud storage
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fileObj[file.mimetype] === ".mp4") {
      cb(null, "./uploads/reel");
    } else {
      cb(null, "./uploads/porfolio");
    }
  },
  filename: function (req, file, cb) {
    if (fileObj[file.mimetype] === undefined) {
      cb(new Error("file format not valid"));
    } else {
      let pathName = "";

      if (fileObj[file.mimetype] === ".mp4") {
        pathName = "reel";
      } else {
        pathName = "porfolio";
      }

      cb(
        null,
        `${pathName}-${file.fieldname}-${Date.now()}${fileObj[file.mimetype]}`
      );
    }
  },
});

const uploads = (file) => {
  const uploadMulter = multer({
    storage: multer.memoryStorage(), //storage
    limits: {
      fileSize: 1024 * 1024 * 15,
    },
    onError: function (err, next) {
      next(err);
    },
    //fileFilter: imageFilter,
  }).single(file);

  //const uploadAsync = util.promisify(upload.single("file"));

  return function (req, res, next) {
    try {
      uploadMulter(req, res, function (err) {
        if (err) {
          return res.status(400).send({
            status: {
              code: 400,
              message: err.message,
            },
          });
        }

        return next();
      });
    } catch (err) {
      return res.status(400).send({
        status: {
          code: 400,
          message: err.message,
        },
      });
    }
  };
};

module.exports = uploads;
