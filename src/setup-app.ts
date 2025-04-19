import express, { Express } from "express";
import cors from 'cors'

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cors())

  app.get("/", (req, res) => {
    res.status(200).send('Hello world!')
  });
  return app;
};
