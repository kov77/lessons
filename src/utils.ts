type VideoInput = {
  title: string;
  author: string;
  availableResolutions: string[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};

export function validateVideoInput(data: VideoInput) {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = data;

  const errors: { message: string; field: string }[] = [];

  if (!title || typeof title !== "string" || title.length > 40) {
    errors.push({
      field: "title",
      message: "Title must be string and max 40 chars",
    });
  }

  if (!author || typeof author !== "string" || author.length > 20) {
    errors.push({
      field: "author",
      message: "Author must be string and max 20 chars",
    });
  }

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
  if (
    !Array.isArray(availableResolutions) ||
    !availableResolutions.every((r) => validResolutions.includes(r))
  ) {
    errors.push({
      field: "availableResolutions",
      message: "Invalid resolutions",
    });
  }

  if (canBeDownloaded !== undefined && typeof canBeDownloaded !== "boolean") {
    errors.push({ field: "canBeDownloaded", message: "Must be boolean" });
  }

  if (
    minAgeRestriction !== undefined &&
    (typeof minAgeRestriction !== "number" ||
      minAgeRestriction < 1 ||
      minAgeRestriction > 18)
  ) {
    errors.push({
      field: "minAgeRestriction",
      message: "Must be a number from 1 to 18",
    });
  }

  if (
    publicationDate &&
    (typeof publicationDate !== "string" || isNaN(Date.parse(publicationDate)))
  ) {
    errors.push({
      field: "publicationDate",
      message: "Must be valid ISO string date",
    });
  }

  return errors;
}
