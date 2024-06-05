import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(500).json({ message: "Sorry you are  not login" });
  }
  req.user = jwt.verify(token, process.env.JWT_Secret);
  next();
};
