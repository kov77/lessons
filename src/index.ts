import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";
import { runDB } from "./db/mongo.db";

const app = express();
setupApp(app);

const bootstrap = async () => {
  await runDB(SETTINGS.MONGO_URI);

  app.listen(SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${SETTINGS.PORT}`);
  });
};

bootstrap();

// Vercel requires the app as the default export
export default app;
