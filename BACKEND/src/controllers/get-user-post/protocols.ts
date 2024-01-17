import { perfil } from "../../models/perfil";

export interface IGetUserPostRepository {
    getUserPost(email: string): Promise<perfil>
}