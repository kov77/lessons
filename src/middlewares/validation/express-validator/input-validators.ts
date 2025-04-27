import { body, param, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validResolutions = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
];

const formatErrors = (error: any) => ({
  field: error.path,
  message: error.msg,
});

export const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).formatWith(formatErrors).array();

  if (errors.length) {
    return res.status(400).json({ errorMessages: errors });
  }
  next();
};

export const videoTitleValidator = body("title")
  .isString()
  .withMessage("Title should be a string")
  .trim()
  .notEmpty()
  .withMessage("title is required")
  .isLength({ min: 1, max: 40 })
  .withMessage("Title should be from 1 to 40 characters long");

export const videoAuthorValidator = body("author")
  .trim()
  .notEmpty()
  .withMessage("Author is required")
  .isLength({ min: 1, max: 20 })
  .withMessage("Author should be from 1 to 20 characters long");

export const videoAvailableResolutionsValidator = body("availableResolutions")
  .isArray()
  .withMessage("Available resolutions should be an array")
  .custom((value) => {
    return value.every((resolution: string) =>
      validResolutions.includes(resolution),
    );
  })
  .withMessage("Invalid resolutions");

export const videoCanBeDownloadedValidator = body("canBeDownloaded")
  .optional()
  .isBoolean()
  .withMessage("canBeDownloaded should be boolean");

export const videoMinAgeRestrictionValidator = body("minAgeRestriction")
  .optional()
  .isInt({ min: 1, max: 18 })
  .withMessage("minAgeRestriction should be a number from 1 to 18");

export const videoPublicationDateValidator = body("publicationDate")
  .optional()
  .isString()
  .withMessage("publicationDate should be a string")
  .custom((value) => {
    if (value && isNaN(Date.parse(value))) {
      throw new Error("publicationDate should be a valid ISO date");
    }
    return true;
  });

export const videoIdValidator = param("id")
  .notEmpty()
  .withMessage("videoId is required")
  .isInt()
  .withMessage("videoId should be a number")
  .custom((value) => {
    if (parseInt(value) < 0) {
      throw new Error("videoId should be a positive number");
    }
    return true;
  });

export const videoNotIsNaNValidator = param("id")
  .notEmpty()
  .withMessage("videoId is required")
  .isInt()
  .withMessage("videoId should be a number")
  .custom((value) => {
    if (isNaN(parseInt(value))) {
      throw new Error("videoId should be a number");
    }
    return true;
  });

export const videoValidationMiddleware = [
  videoAuthorValidator,
  videoTitleValidator,
  videoAvailableResolutionsValidator,
  videoCanBeDownloadedValidator,
  videoMinAgeRestrictionValidator,
  videoPublicationDateValidator,
];
