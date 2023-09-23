import mongoose from 'mongoose';
import userService from '../services/user.service.js';

export const validId = (req, res, next) =>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message : "Invalid ID"})
    }

    next();
};

export const validUser = async (req, res, next) =>{
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if(!user){
        return res.status(400).send({ message: "User not found"});
    }

    req.userId = id;
    req.user = user;

    next();
};

export const ifExistsInfoNews = (req, res, next) => {
    const { title, text, banner } = req.body;

    if (!title && !text && !banner) {
        return res
          .status(400)
          .send({ message: "Submit at least noe field to update the post" });
      }

    next()
}