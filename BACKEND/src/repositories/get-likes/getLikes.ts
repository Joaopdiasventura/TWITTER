import { GetLikesParams, IGetLikesRepository } from "../../controllers/getLikes/protocols";
import { Like } from "../../models/likes";
import prisma from "../../services/prisma";

export class GetLikesRepository implements IGetLikesRepository{
    async getLikes(params: GetLikesParams): Promise<Like[]> {
        
        const likes = await prisma.like.findMany({
            where: {
                post: params.post
            }
        })

        return likes;
    }

}