import bcrypt from "bcrypt";
import { generateTokenRepository, loginRepository } from "../repositories/auth.repositories.js";

const loginService = async (body) => {
  const { email, password } = body;

  const user = await loginRepository(email);

  if (!user) throw new Error("User or Password not found");

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) throw new Error("User or Password not found");

  return user;
};
const generateTokenService = async (userId) => {
    const token = generateTokenRepository(userId);

    return token;
}

export { loginService, generateTokenService };
