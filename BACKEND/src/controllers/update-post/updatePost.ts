import { Post } from "../../models/post";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdatePostRepository, UpdatePostParams } from "./protocols";

export class UpdatePostController implements IController{
    constructor(private readonly updatePostRepository: IUpdatePostRepository){}
    async handle(request?: HttpRequest<UpdatePostParams>): Promise<HttpResponse<Post | object>> {
        try {
            const {body} = request
            const {params} = request

            const post = await this.updatePostRepository.updatePost(params.id, body);

            return{
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