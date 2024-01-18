import { Post } from "../../models/post";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { DeletePostParams, IDeletePostRepository } from "./protocols";

export class DeletePostController implements IController {
    constructor(private readonly deletePostRepository: IDeletePostRepository){}
    async handle(request?: HttpRequest<DeletePostParams>): Promise<HttpResponse<Post>> {

        const {params} = request

        try {

            const post = await this.deletePostRepository.deletePost(params);

            return {
                statusCode: 201,
                body: post
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }

    }

}