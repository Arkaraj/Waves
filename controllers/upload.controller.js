import path from "path";
import { customErrorHandler } from "../helper/ErrorHandler";

export default {
  getImage: async (req, res) => {
    try {
      let fileName = req.params.id;
      console.log(req.params.id);
      let options = {
        root: path.join(__dirname + "/../uploads/"),
      };

      return res.sendFile(fileName, options, function (err) {
        if (err) {
          return customErrorHandler(res, 404, "Couldn't find file");
        } else {
          console.log("Sent:", fileName);
          return;
        }
      });
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
};
