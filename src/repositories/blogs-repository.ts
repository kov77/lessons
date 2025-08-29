import { db } from "../db/db";

export const blogsRepository = {
  getAllBlogs() {
    console.log("zalupa");
    return db.blogs;
  },
};
