import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(email: string): Promise<User> {
    const db = MongoClient.db();
    const usersCollection = db.collection<User>("users");

    const user = await usersCollection.findOne({ email: email });
    const { deletedCount } = await usersCollection.deleteOne({ email: email });

    if (!deletedCount ) {
        throw new Error("Usuario não foi deletado");
    }
    
    return user;
  }
}
