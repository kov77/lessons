import { Collection, Db } from "mongodb";
import { Blog } from "../types/blog";
import { Post } from "../types/post";

export const BLOG_COLLECTION_NAME = "blogs";
export const POST_COLLECTION_NAME = "posts";

export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

export function initCollections(db: Db): void {
  blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
  postCollection = db.collection<Post>(POST_COLLECTION_NAME);
}
