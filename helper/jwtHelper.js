import { config } from "../config";

/**
 * Generates a jwt token for the user
 * @returns {token} the signed access token
 */
export const signToken = (id) => {
  return JWT.sign(
    {
      iss: "Arkaraj", // issued by
      sub: id,
    },
    `${config.SECRET}`,
    { expiresIn: "31d" }
  );
};
