import { Post } from "../../models/post";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreatePostParams, ICreatePostRepository } from "./protocols";

export class CreatePostController implements IController{
    constructor (private readonly createPostRepository: ICreatePostRepository) {}
    async handle(httpRequest: HttpRequest<CreatePostParams>): Promise<HttpResponse<Post>> {
        try {
            const {body} = httpRequest;

            const post = await this.createPostRepository.createPost(body);

            return {
                statusCode: 201,
                body: post
            }

        } catch (error) {
            console.log(`${error}`);
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}