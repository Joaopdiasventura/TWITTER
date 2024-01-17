import { ICreateLikeRepository, createLikeParams } from "../../controllers/create-like/protocols";
import { Like } from "../../models/likes";
import prisma from "../../services/prisma";

export class CreateLikeRepository implements ICreateLikeRepository{
    async createLike(params: createLikeParams): Promise<Like> {
        const like = await prisma.like.create({
            data: {
                ...params
            }
        });
        return like;
    }
}