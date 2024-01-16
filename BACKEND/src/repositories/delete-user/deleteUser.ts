import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class DeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(email: string): Promise<User> {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          email: email, 
        },
      });

      return deleteUser;
    } catch (error) {
      throw new Error("Usuário não foi deletado");
    }
  }
}
