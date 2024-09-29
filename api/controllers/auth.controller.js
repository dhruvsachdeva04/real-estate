import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "messsage not sent" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) res.status(401).json({ message: "invalid credentials" });

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass) res.status(401).json({ message: "invalid credentials" });

    const age = 1000 * 60 * 60 * 24 * 7;

    const { password: userPassword, ...userInfo } = user;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).send({ message: "cannot login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json("logout successful");
};
