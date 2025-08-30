import { db } from "../db/db";

export const blogsRepository = {
  getAllBlogs() {
    return db.blogs;
  },
  addNewBlog(name: string, description: string, websiteUrl: string) {
    const newBlog = {
      id: (db.blogs.length + 1).toString(),
      name,
      description,
      websiteUrl,
      createdAt: new Date().toISOString(),
    };
    db.blogs.push(newBlog);
    return newBlog;
  },
};
