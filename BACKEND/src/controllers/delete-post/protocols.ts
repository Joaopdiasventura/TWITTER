import { Post } from "../../models/post";

export interface DeletePostParams {
    id: string;
}

export interface IDeletePostRepository {
    deletePost(params: DeletePostParams): Promise<Post>
}