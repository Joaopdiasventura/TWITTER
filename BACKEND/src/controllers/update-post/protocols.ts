import { Post } from "../../models/post";

export interface UpdatePostParams {
    id?: string
    title?: string;
    content?: string
}

export interface IUpdatePostRepository {
    updatePost(id: string, params : UpdatePostParams): Promise<Post | object>
}