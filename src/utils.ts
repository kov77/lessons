import { Response } from "express";

export const sendValidationError = (
  res: Response,
  field: string,
  message: string,
  statusCode = 400,
) => {
  res.status(statusCode).send({
    errorsMessages: [
      {
        message,
        field,
      },
    ],
  });
};
