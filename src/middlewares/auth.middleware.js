import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid!" });
      }
      const user = await userService.findByIdService(decoded.id);

      if (!user || !user._id){
        return req.status(401).send({ message: "Invalid Token!" });
      }

      req.userId = user._id;
      return next();
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};
