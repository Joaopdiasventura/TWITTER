import { IGetUserPostRepository } from "../../controllers/get-user-post/protocols";
import { Post } from "../../models/post";
import prisma from "../../services/prisma";

export class GetUserPostRepository implements IGetUserPostRepository{
    async getUserPost(email: string): Promise<Post[]> {

        const user = await prisma.user.findUnique({
            where:{ email: email }
        });

        const posts = await prisma.post.findMany({
            where: {
                creator: user.email
            },  
            orderBy: {
                id: 'desc',
            }
        });

        return posts
    }

}