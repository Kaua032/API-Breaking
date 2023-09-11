import mongoose from 'mongoose';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const loginService = (email) => User.findOne({email: email}).select("+password");
const generateToken = (id) => jwt.sign({ id: id}, process.env.SECRET_JWT, {expiresIn: 8400});

export { loginService, generateToken };