import { perfil } from "../../models/perfil";

export interface GetUserPostsParams {
    email: string
}

export interface IGetUserPostRepository {
    getUserPost(email: string): Promise<perfil>
}