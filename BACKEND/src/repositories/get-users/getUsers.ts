import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class GetUserRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users;
    }
}
