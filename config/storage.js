const firebaseApp = require("./firebase");

const bucket = firebaseApp.storage().bucket();

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
 * Upload the image file to Google Storage
 */
const google = (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    if (fileObj[req.file.mimetype] === undefined) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "file format not valid",
        },
      });
    } else {
      let pathName = "";

      if (fileObj[req.file.mimetype] === ".mp4") {
        pathName = "video";
      } else {
        pathName = "image";
      }

      const filename = `${pathName}-${req.file.fieldname}-${Date.now()}${
        fileObj[req.file.mimetype]
      }`;
      const file = bucket.file(filename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
        resumable: false,
      });

      stream.on("error", (err) => {
        req.file.cloudStorageError = err;
        return next(err);
      });

      stream.on("finish", () => {
        req.file.cloudStorageObject = filename;
        file.makePublic();
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

        return next();
      });

      stream.end(req.file.buffer);
    }
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

module.exports = { google };
