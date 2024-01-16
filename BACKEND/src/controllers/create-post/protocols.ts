import { Post } from "../../models/post";
import { User } from "../../models/user";

export interface CreatePostParams {
    title: string;
    content: string;
    creator: string;
    creatorUser: User;
    createdat: Date,
}

export interface ICreatePostRepository {
    createPost(params: CreatePostParams): Promise<Post>
}