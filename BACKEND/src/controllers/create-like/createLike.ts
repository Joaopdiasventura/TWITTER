import { Like } from "../../models/likes";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ICreateLikeRepository, createLikeParams } from "./protocols";

export class CreateLikeController implements IController{
    constructor(private readonly createLikeRepository: ICreateLikeRepository){}
    async handle(request: HttpRequest<createLikeParams>): Promise<HttpResponse<Like>> {
        const {body} = request;
        try {

            const like = await this.createLikeRepository.createLike(body);

            return {
                statusCode: 201,
                body: like
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}