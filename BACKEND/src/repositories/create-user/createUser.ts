import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/register-user/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    
    const user = await prisma.user.create({
      data: {
        ...params
      },
    })

    return user;
  }
}
