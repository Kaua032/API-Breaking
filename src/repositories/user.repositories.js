import User from "../models/User.js";

export const userFindByEmailUserRepository = (email) => User.findOne({email: email});

export const userCreateRepository = (body) => User.create(body);

export const userFindAllRepository = () => User.find();

export const userFindByIdRepository = (id) => User.findOne({_id: id});

export const userUpdateRepository = (id, body) =>
  User.findOneAndUpdate({ _id: id }, { name: body.name, username: body.username, email: body.email, password: body.password, avatar: body.avatar, background: body.background });

export default {
  userFindByEmailUserRepository,
  userCreateRepository,
  userFindAllRepository,
  userFindByIdRepository,
  userUpdateRepository,
};
