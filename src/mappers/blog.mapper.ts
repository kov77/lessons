import { WithId } from "mongodb";
import { Blog } from "../types/blog";
import { BlogInputDto } from "../dto/blog.input.dto";
import { BlogViewDto } from "../dto/blog.view.dto";

export const mapBlogToViewDto = (blog: WithId<Blog>): BlogViewDto => ({
  id: blog._id.toString(),
  name: blog.name,
  description: blog.description,
  websiteUrl: blog.websiteUrl,
  createdAt: blog.createdAt.toISOString(),
  isMembership: blog.isMembership,
});

export const mapBlogInputDtoToBlog = (dto: BlogInputDto): Blog => ({
  name: dto.name,
  description: dto.description,
  websiteUrl: dto.websiteUrl,
  createdAt: new Date(),
  isMembership: false,
});

export const mapBlogInputDtoToBlogUpdate = (
  dto: BlogInputDto,
): Omit<Blog, "createdAt" | "isMembership"> => ({
  name: dto.name,
  description: dto.description,
  websiteUrl: dto.websiteUrl,
});
