import { ObjectId } from "mongodb";

// ObjectId.isValid also accepts any 12-character string, so check the hex form
export const isValidObjectId = (id: string): boolean =>
  /^[0-9a-fA-F]{24}$/.test(id);

export const toObjectId = (id: string): ObjectId | null =>
  isValidObjectId(id) ? new ObjectId(id) : null;
