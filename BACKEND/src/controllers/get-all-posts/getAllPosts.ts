import { Post } from "../../models/post";
import { HttpResponse, IController } from "../protocols";
import { IGetAllPostsRepository } from "./protocols";

export class GetAllPostsController implements IController {
    constructor(private readonly getAllPostsRepository: IGetAllPostsRepository){}
    async handle(): Promise<HttpResponse<Post[]>> {
        const posts = await this.getAllPostsRepository.getAllPosts();
        return {
            statusCode: 200,
            body: posts
        }
    }

}