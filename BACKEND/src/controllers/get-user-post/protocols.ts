import { Post } from "../../models/post";

export interface IGetUserPostRepository {
    getUserPost(email: string): Promise<Post[]>
}