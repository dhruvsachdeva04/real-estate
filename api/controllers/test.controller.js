import jwt from "jsonwebtoken";

export const authorize = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "you are authenticated" });
};

export const adminAuth = async (req, res) => {
  const token = req.cookies.token;

  console.log(token);
  if (!token)
    return res.status(401).json({ message: "you are not authenticated" });

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "token not valid" });
    if (!token.isAdmin)
      return res.status(403).json({ message: "no previleges" });
  });

  res.status(200).json({ message: "you are authenticated" });
};
