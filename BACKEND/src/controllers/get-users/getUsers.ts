import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { GetUsersParams, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController{
    constructor (private readonly getUserRepository: IGetUsersRepository) {}
    async handle(request?: HttpRequest<GetUsersParams>): Promise<HttpResponse<User[]>> {
        const {body} = request;
        try {

            const users = await this.getUserRepository.getUser(body);

            return {
                statusCode: 200,
                body: users
            };

        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}