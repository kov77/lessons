import { db } from "../db/db";

let nextId = 1;

export const postsRepository = {
  getAllPosts() {
    return db.posts;
  },
  getPostById(id: string) {
    return db.posts.find((p) => p.id === id);
  },
  addNewPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  ) {
    const blog = db.blogs.find((b) => b.id === blogId);
    const newPost = {
      id: (nextId++).toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: blog?.name ?? "",
    };
    db.posts.push(newPost);
    return newPost;
  },
  updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  ) {
    const post = db.posts.find((p) => p.id === id);
    if (!post) return false;

    const blog = db.blogs.find((b) => b.id === blogId);
    Object.assign(post, {
      title,
      shortDescription,
      content,
      blogId,
      blogName: blog?.name ?? post.blogName,
    });
    return true;
  },
  deletePost(id: string) {
    const index = db.posts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    db.posts.splice(index, 1);
    return true;
  },
  deleteAllPosts() {
    db.posts = [];
  },
};
