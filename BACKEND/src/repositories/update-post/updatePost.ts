import { IUpdatePostRepository, UpdatePostParams } from "../../controllers/update-post/protocols";
import { Post } from "../../models/post";
import prisma from "../../services/prisma";

export class UpdatePostRepository implements IUpdatePostRepository {
    async updatePost(id: string, params: UpdatePostParams): Promise<Post | object> {
        const post = await prisma.post.findUnique({ where: { id: id } });

        if (!post) {
            return {
                message: "Post não encontrado"
            };
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                ...params
            }
        });

        return updatedPost;
    }
}
