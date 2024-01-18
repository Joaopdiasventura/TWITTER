import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { User } from "../../models/user";
import prisma from "../../services/prisma";

export class DeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(email: string): Promise<User> {
    try {

      const posts = await prisma.post.findMany({
        where:{
          creator: email
        }
      })

      for (let i = 0; i < posts.length; i++) {

        await prisma.like.deleteMany({
          where: { post: posts[i].id}
        })
        
      }

      await prisma.post.deleteMany({
        where: {
          creator: email
        }
      })

      const deleteUser = await prisma.user.delete({
        where: {
          email: email, 
        },
      });

      return deleteUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
