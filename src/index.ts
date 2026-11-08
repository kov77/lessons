import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";
import { runDB } from "./db/mongo.db";

const app = express();
setupApp(app);

const bootstrap = async () => {
  if (!SETTINGS.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  await runDB(SETTINGS.MONGO_URI);

  app.listen(SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${SETTINGS.PORT}`);
  });
};

bootstrap();

// Vercel requires the app as the default export
export default app;
