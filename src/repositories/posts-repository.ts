import { WithId } from "mongodb";
import { postCollection } from "../db/collections";
import { Post } from "../types/post";
import { PaginationQuery } from "../types/pagination";
import { toObjectId } from "../utils/object-id";

export const postsRepository = {
  async findAll(
    { pageNumber, pageSize, sortBy, sortDirection }: PaginationQuery,
    blogId?: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const filter = blogId ? { blogId } : {};

    const [items, totalCount] = await Promise.all([
      postCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1, _id: 1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      postCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    const _id = toObjectId(id);
    return _id ? postCollection.findOne({ _id }) : null;
  },

  async create(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postCollection.insertOne({ ...newPost });
    return { ...newPost, _id: insertResult.insertedId };
  },

  // Returns true if the post was found and updated, false otherwise
  async update(id: string, post: Omit<Post, "createdAt">): Promise<boolean> {
    const _id = toObjectId(id);
    if (!_id) return false;

    const updateResult = await postCollection.updateOne(
      { _id },
      { $set: post },
    );
    return updateResult.matchedCount > 0;
  },

  // Returns true if the post was found and deleted, false otherwise
  async delete(id: string): Promise<boolean> {
    const _id = toObjectId(id);
    if (!_id) return false;

    const deleteResult = await postCollection.deleteOne({ _id });
    return deleteResult.deletedCount > 0;
  },

  async deleteAll(): Promise<void> {
    await postCollection.deleteMany({});
  },
};
