import { CreatePostParams, ICreatePostRepository } from "../../controllers/create-post/protocols";
import { Post } from "../../models/post";
import prisma from "../../services/prisma";

export class CreatePostRepository implements ICreatePostRepository {
    async createPost(params: CreatePostParams): Promise<Post> {
        const post = await prisma.post.create({
            data: {
                title: params.title,
                content: params.content,
                creator: params.creatorUser.email,
                createdat: new Date(),
            },
        });

        return post;
    }
}