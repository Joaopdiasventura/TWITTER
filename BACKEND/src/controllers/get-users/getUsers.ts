import { sendUser } from "../helpers";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController{

    constructor (private readonly GetUsersRepository: IGetUsersRepository){}

    async handle() {
        try {

            const users = await this.GetUsersRepository.getUsers();
    
            return sendUser(200, users)

        } catch (error) {
            return {
                statusCode: 500,
                body: `Erro ao receber users ${error}`
            }
        }
    }
}