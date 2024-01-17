import { IGetAllPostsRepository } from "../../controllers/get-all-posts/protocols";
import { Post } from "../../models/post";
import prisma from "../../services/prisma";

export class GetAllPostsRepository implements IGetAllPostsRepository{
    async getAllPosts(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            orderBy: {
                id: "desc"
            }
        });
        return posts;
    }

}