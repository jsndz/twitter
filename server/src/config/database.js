import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";

export const connect = async () => {
  await mongoose.connect(MONGODB_URL);
};
