import { NextFunction, Request, RequestHandler, Response } from "express";

// Express 4 does not catch rejected promises, so forward them to next()
export const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };
