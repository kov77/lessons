export const db = {
  videos: [
    {
      id: 0,
      title: "video 1",
      author: "Author 1",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2025-04-13T01:58:45.604Z",
      publicationDate: "2025-04-13T01:58:45.604Z",
      availableResolutions: ["P144", "P360", "P480"],
    },
    {
      id: 1,
      title: "video 2",
      author: "Author 2",
      canBeDownloaded: true,
      minAgeRestriction: 4,
      createdAt: "2025-04-13T01:58:45.604Z",
      publicationDate: "2025-04-13T01:58:45.604Z",
      availableResolutions: ["P144", "P256", "P360", "P480", "P720", "P1080"],
    },
    {
      id: 2,
      title: "video 3",
      author: "Author 3",
      canBeDownloaded: false,
      minAgeRestriction: 18,
      createdAt: "2025-04-13T01:58:45.604Z",
      publicationDate: "2025-04-13T01:58:45.604Z",
      availableResolutions: ["P768", "P1080", "P1440", "P2160", "P4320"],
    },
  ],
  blogs: [
    {
      id: "1",
      name: "blog 1",
      description: "description 1",
      websiteUrl: "https://blog1.com",
    },
    {
      id: "2",
      name: "blog 2",
      description: "description 2",
      websiteUrl: "https://blog2.com",
    },
    {
      id: "3",
      name: "blog 3",
      description: "description 3",
      websiteUrl: "https://blog3.com",
    },
  ],
};
