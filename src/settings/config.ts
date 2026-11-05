const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || "qwerty";

export const SETTINGS = {
  PORT: env.PORT || 5003,
  MONGO_URI:
    env.MONGO_URI ||
    "mongodb+srv://maksymkoval6167_db_user:root@cluster0.2ememho.mongodb.net/",
  DB_NAME: env.DB_NAME || "be-lessons",
};
