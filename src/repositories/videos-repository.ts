const db = {
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
};

type VideoType = {
  title: string;
  author: string;
  availableResolutions: string[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
};
export const videosRepository = {
  getAllVideos() {
    return db.videos;
  },
  addVideo({
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
  }: VideoType) {
    const newId = db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 0;
    const now = new Date();

    db.videos.push({
      id: newId,
      title,
      author,
      canBeDownloaded: canBeDownloaded ?? false,
      minAgeRestriction: minAgeRestriction ?? null,
      createdAt: now.toISOString(),
      publicationDate: new Date(
        now.getTime() + 24 * 60 * 60 * 1000,
      ).toISOString(),
      availableResolutions,
    });

    return db.videos[newId];
  },
  getVideoById(id: number) {
    return db.videos.find((video) => video.id === id);
  },
  updateVideo(id: number, data: Partial<VideoType>) {
    const videoIndex = db.videos.findIndex((video) => video.id === id);
    if (videoIndex === -1) {
      return null;
    }
    db.videos[videoIndex] = { ...db.videos[videoIndex], ...data };
    return db.videos[videoIndex];
  },
  deleteVideo(id: number) {
    const videoIndex = db.videos.findIndex((video) => video.id === id);
    if (videoIndex === -1) {
      return null;
    }
    const deletedVideo = db.videos[videoIndex];
    db.videos.splice(videoIndex, 1);
    return deletedVideo;
  },
  deleteAllVideos() {
    db.videos = [];
  },
};
