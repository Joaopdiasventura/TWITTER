import { IUpdateUserRepository, UpdateUserParams } from "../../controllers/update-user/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class UpdateUserRepository implements IUpdateUserRepository{
    async updateUser(email: string, params: UpdateUserParams): Promise<User> {
        const updateUser = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              ...params
            },
          })

        return updateUser;
    }
}