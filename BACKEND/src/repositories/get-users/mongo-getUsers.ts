import { MongoClient } from "../../database/mongo";
import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUserRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const db = MongoClient.db();
        const usersCollection = db.collection<User>("users");
        const users = await usersCollection.find({}).toArray();
        return users;
    }
}
