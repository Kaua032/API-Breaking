import {
  createRepository,
  findAllRepository,
  countNewsRepository,
  topNewsRepository,
  findByIdRepository,
  searchByTitleRepository,
  byUserRepository,
  updateRepository,
  eraseRepository,
  likeNewsRepository,
  deleteLikeNewsRepository,
  addCommentRepository,
  deleteCommentRepository,
} from "../repositories/news.repositories.js";

const createService = async (body, userId) => {
  const { title, text, banner } = body;

    if (!title || !text || !banner) throw new Error( "Submit all fields for registration");

    const news = await createRepository({
      title,
      text,
      banner,
      user: userId,
    });

    return news
};

const findAllService = async (offset, limit) => {
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllRepository(offset, limit);
    const total = await countNewsRepository();

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    news.shift();

    return {
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: news.map((newsItem) => (
        {
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    };


};

const topNewsService = async (req, res) => {
  try {
    const news = await topNewsRepository();

    if (!news) {
      return res.status(400).send({ message: "There is no registred post" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdRepository(id);

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitleService = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleRepository(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no posts with this title" });
    }

    return res.send({
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byUserService = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserRepository(id);

    return res.send({
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    const news = await findByIdRepository(id);

    if (`${news.user._id}` !== `${req.userId}`) {
      return res.status(500).send({ message: "You didn't create this news" });
    }

    await updateRepository(id, title, text, banner);

    return res.send({ message: "News successfully updated!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const eraseService = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdRepository(id);

    if (`${news.user._id}` !== `${req.userId}`) {
      return res.status(500).send({ message: "You didn't create this news" });
    }

    await eraseRepository(id);

    return res.send({ message: "News deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const likeNewsService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeNewsRepository(id, userId);

    if (!newsLiked) {
      await deleteLikeNewsRepository(id, userId);
      return res.status(200).send({ message: "Like successfully removed" });
    }

    res.send({ message: "Like done successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addCommentService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    await addCommentRepository(id, comment, userId);

    res.send({ message: "Comment successfully completed!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteCommentService = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentRepository(
      idNews,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res
        .status(404)
        .send({ message: "You can't delete this comment. " });
    }

    if (commentFinder.userId !== userId) {
      return res
        .status(400)
        .send({ message: "You can't delete this comment. " });
    }

    res.send({ message: "Comment successfully removed!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
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
};
