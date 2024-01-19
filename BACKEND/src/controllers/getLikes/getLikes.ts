import { HttpRequest, HttpResponse, IController } from "../protocols";
import { GetLikesParams, IGetLikesRepository } from "./protocols";
import { Like } from "../../models/likes";

export class GetLikesController implements IController{
    constructor(private readonly getLikesRepository: IGetLikesRepository){}
    async handle(request?: HttpRequest<GetLikesParams>): Promise<HttpResponse<Like[]>> {
        const {params} = request;

        try {
            const likes = await this.getLikesRepository.getLikes(params);

            return {
                statusCode: 200,
                body: likes
            }
        } catch (error) {
            return{
                statusCode: 500,
                body: error
            }
        }
    }

}