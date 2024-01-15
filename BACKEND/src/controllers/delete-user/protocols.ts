import { User } from "../../models/user";

export interface IDeleteUserRepository{
    deleteUser(email: string): Promise<User>
}

export interface DeleteUserParams{
    email?:string;
}