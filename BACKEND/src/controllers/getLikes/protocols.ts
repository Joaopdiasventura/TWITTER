import { Like } from "../../models/likes";

export interface GetLikesParams {
    post: string;
}

export interface IGetLikesRepository {
    getLikes(params: GetLikesParams): Promise<Like[]>;
}