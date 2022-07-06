import { config } from "../config";
import JWT from "jsonwebtoken";

/**
 * Generates a jwt token for the user
 * @returns {token} the signed access token
 */
export const signToken = (id) => {
  return JWT.sign(
    {
      iss: "https://github.com/Arkaraj",
      sub: id,
    },
    `${config.SECRET}`,
    { expiresIn: "31d" }
  );
};
