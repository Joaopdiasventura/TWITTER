import { ICreateLikeRepository, createLikeParams } from "../../controllers/create-like/protocols";
import { Like } from "../../models/likes";
import prisma from "../../services/prisma";

export class CreateLikeRepository implements ICreateLikeRepository{
    async createLike(params: createLikeParams): Promise<Like> {

        const liked = await prisma.like.findFirst({
            where:{
                ...params
            }
        })

        if (liked) {
            await prisma.like.delete({
                where:{
                    id: liked.id
                }
            })

            return liked;
        }

        const like = await prisma.like.create({
            data: {
                ...params
            }
        });
        return like;
    }
}