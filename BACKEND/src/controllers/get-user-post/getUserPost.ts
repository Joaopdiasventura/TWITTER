import { Post } from "../../models/post";
import { User } from "../../models/user";
import { GetUserPostRepository } from "../../repositories/get-user-post/getUserPost";
import { HttpRequest, HttpResponse, IController } from "../protocols";

export class GetUserPostController implements IController{
    constructor(private readonly getUserPost: GetUserPostRepository){}
    async handle(request: HttpRequest<User>): Promise<HttpResponse<Post[]>> {
        const {email} = request.params;

        const posts = await this.getUserPost.getUserPost(email);

        return {
            statusCode: 200,
            body: posts
        }
    }

}