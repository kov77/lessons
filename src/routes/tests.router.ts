import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { deleteAllDataHandler } from "./handlers/testing/delete-all-data.handler";

export const testsRouter = Router();

testsRouter.delete("/all-data", asyncHandler(deleteAllDataHandler));
