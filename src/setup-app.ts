import express, { Express } from "express";
import cors from "cors";
import type { Request, Response } from "express";

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world!");
  });

  return app;
};
