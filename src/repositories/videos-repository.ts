import { db } from "../db/db";

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
};
