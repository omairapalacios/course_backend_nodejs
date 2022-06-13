import jwt from "jsonwebtoken";
import { UserDao } from "../database/userDAO";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config";

dotenv.config();

const PIRVATE_KEY = JWT_SECRET;
const userDAO = new UserDao();

const createUser = async (user) => {
  const { email, password } = user;

  const oldUser = await userDAO.getByEmail(email);

  if (oldUser) {
    throw {
      status: 409,
      message: "El usuario ya existe, por favor loguee con sus credenciales.",
    };
  }

  if (!email || !password) {
    throw {
      status: 400,
      message: "El email y password son requeridos",
    };
  }

  const token = jwt.sign({ email: user.email }, PIRVATE_KEY, {
    expiresIn: "600s",
  });

  const encryptedPassword = await bcrypt.hash(password, 10);

  userDAO.guardar({ email, password: encryptedPassword });
  user.token = token;

  return user;
};

const verifyUser = async (email, password) => {
  const user = await userDAO.getByEmail(email);

  if (!user) throw { status: 404, message: "El usuario no existe" };

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: user.id, email: email }, PIRVATE_KEY, {
      expiresIn: "600s",
    });
    user.token = token;
    return user;
  }
};

export const userService = {
  createUser,
  verifyUser,
};
