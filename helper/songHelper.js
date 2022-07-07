import fs from "fs";
import path from "path";
const uploadPath = "/uploads";

/**
 *
 * @param {Number} n Length Of Random String
 * @returns {String} Random String of length n
 */
const randomGenerator = (n) => {
  return (Math.random() + 1).toString(36).substring(n);
};

export const uploadCoverImage = async (req, song) => {
  let image = "";
  //   let fileName = new Date().getTime();
  let fileName = randomGenerator(7) + song;
  const file = req.file;
  try {
    if (!fs.existsSync(path.normalize(`${__dirname}/..${uploadPath}`))) {
      fs.mkdirSync(path.normalize(`${__dirname}/..${uploadPath}`));
    }
    fs.writeFile(
      path.normalize(
        `${__dirname}/..${uploadPath}/${fileName}.${
          file.mimetype.split("/")[1]
        }`
      ),
      file.buffer,
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(
          path.normalize(
            `${__dirname}/..${uploadPath}/${fileName}.${
              file.mimetype.split("/")[1]
            }`
          )
        );
      }
    );
    image = `${uploadPath}/${fileName}.${file.mimetype.split("/")[1]}`;
  } catch (e) {
    console.log(e);
    console.log("Error in saving");
    throw "Error in saving";
  }
  return image;
};
