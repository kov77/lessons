import { WithId } from "mongodb";
import { Post } from "../types/post";
import { PostInputDto } from "../dto/post.input.dto";
import { PostViewDto } from "../dto/post.view.dto";

export const mapPostToViewDto = (post: WithId<Post>): PostViewDto => ({
  id: post._id.toString(),
  title: post.title,
  shortDescription: post.shortDescription,
  content: post.content,
  blogId: post.blogId,
  blogName: post.blogName,
  createdAt: post.createdAt.toISOString(),
});

export const mapPostInputDtoToPost = (
  dto: PostInputDto,
  blogName: string,
): Post => ({
  title: dto.title,
  shortDescription: dto.shortDescription,
  content: dto.content,
  blogId: dto.blogId,
  blogName,
  createdAt: new Date(),
});

export const mapPostInputDtoToPostUpdate = (
  dto: PostInputDto,
  blogName: string,
): Omit<Post, "createdAt"> => ({
  title: dto.title,
  shortDescription: dto.shortDescription,
  content: dto.content,
  blogId: dto.blogId,
  blogName,
});
