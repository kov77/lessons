const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || "qwerty";

export const SETTINGS = {
  PORT: env.PORT || 5003,
  MONGO_URI: env.MONGO_URI,
  DB_NAME: env.DB_NAME || "be-lessons",
};
