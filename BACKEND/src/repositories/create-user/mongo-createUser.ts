import { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        const db = MongoClient.db();
        const usersCollection = db.collection<User>("users");

        await usersCollection.insertOne(params);

        const user = await usersCollection.findOne({ email: params.email });
        if (!user) {
            throw new Error("User not found after creation");
        }

        return user;
    }
}
