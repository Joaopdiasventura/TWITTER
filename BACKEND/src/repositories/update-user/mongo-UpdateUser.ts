import { IUpdateUserRepository, UpdateUserParams } from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository{
    async updateUser(email: string, params: UpdateUserParams): Promise<User> {
        const db = MongoClient.db();
        const usersCollection = db.collection<User>("users");

        await usersCollection.updateOne({email: email}, {
            $set: {
                ...params
            }
        });

        const user = await usersCollection.findOne({ email: email });

        return user;
    }

}