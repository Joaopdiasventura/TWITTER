import { User } from "../../models/user";
import { sendUser } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";
import bcrypt from "bcrypt"

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

      if (body.password) {
        const salt = 10;
        const hash = await bcrypt.hash(body.password, salt);

        body.password = hash;
      }

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