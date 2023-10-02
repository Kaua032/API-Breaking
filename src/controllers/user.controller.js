import userService from "../services/user.service.js";

const create = async (req, res) => {
  const body = req.body;

  try {
    const token = await userService.createService(body);

    return res.status(201).send({ token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    return res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = await userService.findByIdService(req.params.id, res.userId);

    return res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  try {
    const response = await userService.updateService(body, userId);

    res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
