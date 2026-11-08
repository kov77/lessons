import { WithId } from "mongodb";
import { blogCollection } from "../db/collections";
import { Blog } from "../types/blog";
import { PaginationQuery } from "../types/pagination";
import { escapeRegExp } from "../utils/pagination";
import { toObjectId } from "../utils/object-id";

export const blogsRepository = {
  async findAll(
    { pageNumber, pageSize, sortBy, sortDirection }: PaginationQuery,
    searchNameTerm?: string,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const filter = searchNameTerm
      ? { name: { $regex: escapeRegExp(searchNameTerm), $options: "i" } }
      : {};

    const [items, totalCount] = await Promise.all([
      blogCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1, _id: 1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      blogCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Blog> | null> {
    const _id = toObjectId(id);
    return _id ? blogCollection.findOne({ _id }) : null;
  },

  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogCollection.insertOne({ ...newBlog });
    return { ...newBlog, _id: insertResult.insertedId };
  },

  // Returns true if the blog was found and updated, false otherwise
  async update(
    id: string,
    blog: Omit<Blog, "createdAt" | "isMembership">,
  ): Promise<boolean> {
    const _id = toObjectId(id);
    if (!_id) return false;

    const updateResult = await blogCollection.updateOne(
      { _id },
      { $set: blog },
    );
    return updateResult.matchedCount > 0;
  },

  // Returns true if the blog was found and deleted, false otherwise
  async delete(id: string): Promise<boolean> {
    const _id = toObjectId(id);
    if (!_id) return false;

    const deleteResult = await blogCollection.deleteOne({ _id });
    return deleteResult.deletedCount > 0;
  },

  async deleteAll(): Promise<void> {
    await blogCollection.deleteMany({});
  },
};
