import { generateTokenRepository } from "../repositories/auth.repositories.js";
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

const createService = async (body) => {
  const { name, username, email, password, avatar, background } = body;
  console.log(email);

  if (!name || !username || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

  const foundUser = await userRepositories.findByEmailUserRepository(email);

  if (foundUser) throw new Error("User already exists");

  const user = await userRepositories.createRepository(body);

  if (!user) throw new Error("Error creating User");

  const token = generateTokenRepository(user.id);

  return {
    message: "User created sucessfully",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
    token,
  };
};

const findAllService = async () => {
  const users = await userRepositories.findAllRepository();

  if (users.length === 0) throw new Error("There are no registered users");

  return users;
};

const findByIdService = async (userId, userIdLogged) => {
  let idParam;
  if (!userId) {
    userId = userIdLogged;
    idParam = userId;
  } else {
    idParam = userId;
  }

  if (!idParam)
    throw new Error("Send an id in the parameters to search for the user");

  const user = await userRepositories.findByIdRepository(idParam);

  return user;
};

const updateService = async (body, userId) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error("Submit at least one field for update");

  const user = await userRepositories.findByIdRepository(userId);

  if (user._id != userId) throw new Error("You cannot update this user");

  if (password) password = await bcrypt.hash(password, 10);

  await userRepositories.updateRepository(userId, body);

  return { message: "User successfully updated!" };
};

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
