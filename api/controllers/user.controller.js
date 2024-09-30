import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const id_from_token = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== id_from_token) {
    return res.status(403).json({ message: "not authorized" }); // return here to prevent further execution
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        avatar, // corrected this part: avatar was mishandled earlier
      },
    });

    //const { password: userPassword, ...rest } = updatedUser;

    return res.status(200).json(updatedUser); // another response, but only one is sent now
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "failed" }); // always return after sending a response
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const id_from_token = req.userId;

  if (id !== id_from_token) {
    return res.status(403).message({ message: "not authorized" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
  }
};
