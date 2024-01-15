import { User } from "../../models/user";

export interface UpdateUserParams {
    name?: string;
    password?: string;
    email?: string;
}

export interface IUpdateUserRepository {
    updateUser(email: string ,params : UpdateUserParams): Promise<User>
}