import { GetUsersParams, IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class GetUsersRepository implements IGetUsersRepository {
    async getUser(params: GetUsersParams): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: params.name,
                },
            },
        });
    
        return users;
    }
}
