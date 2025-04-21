import request from "supertest";
import app from "src";

describe("Videos", () => {
  const testVideoData = {
    id: 0,
    title: "video 1",
    author: "Author 1",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2025-04-13T01:58:45.604Z",
    publicationDate: "2025-04-13T01:58:45.604Z",
    availableResolutions: ["P144", "P360", "P480"],
  };

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").expect(204);
  });

  it("should create video", async () => {
    const newVideo = {
      ...testVideoData,
      title: "Movie43",
      author: "Steven Brill",
      availableResolutions: ["P360", "P480"],
    };
    const res = await request(app).post("/videos").send(newVideo).expect(201);
    expect(res.body.title).toBe("Movie43");
    expect(res.body.author).toBe("Steven Brill");
  });

  it("should return videos lists", async () => {
    await request(app)
      .post("/videos")
      .send({ ...testVideoData, title: "New Video", author: "Steven Brill" })
      .expect(201);

    await request(app)
      .post("/videos")
      .send({ ...testVideoData, title: "Old Video", author: "Terminator" })
      .expect(201);

    const res = await request(app).get("/videos").expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should return video by id", async () => {
    const createResponse = await request(app)
      .post("/videos")
      .send({ ...testVideoData, title: "New Video" })
      .expect(201);

    const getResponse = await request(app)
      .get(`/videos/${createResponse.body.id}`)
      .expect(200);

    expect(getResponse.body).toEqual({
      ...createResponse.body,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });
});
