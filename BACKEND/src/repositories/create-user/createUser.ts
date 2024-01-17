import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/register-user/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    
    const existUser = await prisma.user.findUnique({
      where: { email: params.email }
    });

    if (existUser) {
     
      return {
        mensage: "Esse email já está cadastrado", 
        email: params.email
      }
      
    }

    const user = await prisma.user.create({
      data: {
        ...params
      },
    })

    return user;
  }
}
