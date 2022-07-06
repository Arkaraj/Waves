import multer from "multer";

/**
 * Single uploads
 */
export const uploadSingleImage = (file_name) => {
  return multer({ limits: { fileSize: 5 * 1024 * 1024 } }).single(file_name);
};
