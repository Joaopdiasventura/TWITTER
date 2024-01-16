import { User } from "@prisma/client";
import { Post } from "../../models/post";

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