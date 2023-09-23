import News from "../models/News.js";

const createRepository = (body) => News.create(body);

const findAllRepository = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNewsRepository = () => News.countDocuments();

const topNewsRepository = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdRepository = (id) => News.findById(id).populate("user");

const searchByTitleRepository = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const byUserRepository = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateRepository = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseRepository = (id) => News.findByIdAndDelete({ _id: id });

const likeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const addCommentRepository = (idNews, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

const deleteCommentRepository = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId  } } }
  );

export {
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
};
