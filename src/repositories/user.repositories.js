import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({email: email});

const createRepository = (body) => User.create(body);

const findAllRepository = () => User.find();

const findByIdRepository = (id) => User.findById(id);

const updateRepository = (id, body) =>
  User.findOneAndUpdate({ _id: id }, { name: body.name, username: body.username, email: body.email, password: body.password, avatar: body.avatar, background: body.background });

export default {
  findByEmailUserRepository,
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository,
};
