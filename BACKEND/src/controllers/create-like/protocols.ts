import { Like } from "../../models/likes";

export interface createLikeParams {
    creator: string;
    post: string;
}

export interface ICreateLikeRepository {
    createLike(params: createLikeParams): Promise<Like>
}

