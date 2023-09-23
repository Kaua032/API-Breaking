import {
  createService,
  findAllService,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likeNewsService,
  addCommentService,
  deleteCommentService,
} from "../services/news.service.js";

const create = async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  try {
    const newNews = await createService(body, userId);

    res.status(201).send(newNews);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  let { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const news = await findAllService(limit, offset, currentUrl);

    return res.send(news);
  } catch (err) {
    res.status(500).send({ message: err.message, message2: "asdfas" });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) throw new Error("There is no registred post");

    return res.send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await findByIdService(id);

    return res.send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const news = await searchByTitleService(title);

    return res.send(news);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byUser = async (req, res) => {
  const id = req.userId;

  try {
    const news = await byUserService(id);

    return res.send(news);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const { title, text, banner } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await updateService(id, title, banner, text, userId);

    return res.send({ message: "News successfully updated!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await eraseService(id, userId);

    return res.send({ message: "News deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const likeNews = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await likeNewsService(id, userId);

    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addComment = async (req, res) => {
  const { id: newsId } = req.params;
  const { comment } = req.body;
  const userId = req.userId;

  try {
    await addCommentService(newsId, comment, userId);

    res.send({ message: "Comment successfully completed!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { idNews, idComment } = req.params;
  const userId = req.userId;

  try {
    await deleteCommentService(idNews, idComment, userId);

    res.send({ message: "Comment successfully removed!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment,
};
