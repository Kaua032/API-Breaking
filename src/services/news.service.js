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

const findAllService = async (limit, offset, currentUrl) => {
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

const topNewsService = async () => {
  const news = await topNewsRepository();

    if (!news) throw new Error("There is no registred post");

    return {
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
    };
};

const findByIdService = async (id) => {
    const news = await findByIdRepository(id);

    return {
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
    };
};

const searchByTitleService = async (title) => {
    const foundNews = await searchByTitleRepository(title);

    if (foundNews.length === 0) throw new Error( "There are no posts with this title");

    return {
      foundNews: foundNews.map((newsItem) => ({
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

const byUserService = async (id) => {
    const news = await byUserRepository(id);

    return {
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
    };
};

const updateService = async (id, title, banner, text, userId) => {
    if(!title && !banner && !text) throw new Error("Submit at least one field to update the news");

    const news = await findByIdRepository(id);

    if (!news) throw new Error("News not found");

    if (`${news.user._id}` !== `${userId}`) throw new Error("You didn't create this news");

    await updateRepository(id, title, text, banner);
};

const eraseService = async (id, userId) => {
    const news = await findByIdRepository(id);

    if(!news) throw new Error("News not found")

    if (`${news.user._id}` !== `${userId}`) throw new Error("You didn't create this news");

    await eraseRepository(id);
};

const likeNewsService = async (id, userId) => {
    const newsLiked = await likeNewsRepository(id, userId);
    console.log(newsLiked);

    if (!newsLiked) {
      await deleteLikeNewsRepository(id, userId);
      return { message: "Like successfully removed" };
    }

    return { message: "Like done successfully" };
};

const addCommentService = async (newsId, comment, userId) => {

    if (!comment) throw new Error("Write a message to comment");

    const news = await findByIdRepository(newsId)

    if (!news) throw new Error("News not found")

    await addCommentRepository(newsId, comment, userId);
};

const deleteCommentService = async (idNews, idComment, userId) => {
  const news = await findByIdRepository(idNews);

  if(!news) throw new Error("News not found");

  await deleteCommentRepository(
      idNews,
      idComment,
      userId
    );
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
