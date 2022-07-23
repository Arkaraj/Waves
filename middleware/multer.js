import multer from "multer";

/**
 * Single uploads
 */
export const uploadSingleImage = (file_name) => {
  let storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  return multer({ limits: { fileSize: 5 * 1024 * 1024 }, storage }).single(
    file_name
  );
};
