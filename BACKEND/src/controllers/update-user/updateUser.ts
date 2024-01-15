import { User } from "../../models/user";
import { sendUser } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const { email } = httpRequest.params;

      if (!email) {
        return {
          statusCode: 400,
          body: {message:`Especifique um usuário para ser atualizado`},
        };
      }

      const { body } = httpRequest;

      const user = await this.updateUserRepository.updateUser(email, body);

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