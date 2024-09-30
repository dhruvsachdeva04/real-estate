import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);
  if (!token)
    return res.status(401).json({ message: "you are not authenticated" });

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "token not valid" });
    req.userId = payload.id;
    next();
  });
};
