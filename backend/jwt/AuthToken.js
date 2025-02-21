
import jwt from "jsonwebtoken";
import { User } from '../model/user.model.js'

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "60d",
  });
  res.cookie("jwt", token, {
    httpOnly: flase, // Temporarily set to false for testing
    secure: true,
    sameSite: "none",
    path: "/", // Ensure the cookie is available throughout the site
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
