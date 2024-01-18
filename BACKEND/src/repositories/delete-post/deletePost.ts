import { DeletePostParams, IDeletePostRepository } from "../../controllers/delete-post/protocols";
import { Post } from "../../models/post";
import prisma from "../../services/prisma";

export class DeletePostRepository implements IDeletePostRepository{
    async deletePost(params: DeletePostParams): Promise<Post> {
        const post = await prisma.post.findUnique({where: {id: params.id}});

        await prisma.like.deleteMany({
            where:{
                post: post.id
            }
        });

        await prisma.post.delete({where: {id: post.id}});

        return post;
    }
}