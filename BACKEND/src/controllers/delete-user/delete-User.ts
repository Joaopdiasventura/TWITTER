import { User } from "../../models/user";
import { sendUser } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { DeleteUserParams, IDeleteUserRepository } from "./protocols";

export class DeleteUserControler implements IController{
    constructor (private readonly deleteUserRepository: IDeleteUserRepository){}
    async handle(
        httpRequest: HttpRequest<DeleteUserParams>
      ): Promise<HttpResponse<User>> {
        try {
          const { email } = httpRequest.params;
    
          if (!email) {
            return {
              statusCode: 400,
              body: {message:`Especifique um usuário para ser atualizado`},
            };
          }

          const user = await this.deleteUserRepository.deleteUser(email);

          return sendUser(200, user);

        } catch (error) {
            console.log(`${error}`);
            return {
              statusCode: 500,
              body: error,
            };
        }
    }

}