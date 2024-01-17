import { Post } from "../../models/post";

export interface IGetAllPostsRepository {
    getAllPosts(): Promise<Post[]>
}