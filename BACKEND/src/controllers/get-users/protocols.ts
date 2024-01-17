import { User } from "../../models/user";

export interface GetUsersParams {
    name: string
}

export interface IGetUsersRepository {
    getUser(params: GetUsersParams): Promise<User[]>
}