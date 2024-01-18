import { FastifyInstance } from "fastify";
import { CreatePostRepository } from "../repositories/create-post/createPost";
import { CreatePostController } from "../controllers/create-post/createPost";
import { GetUserPostRepository } from "../repositories/get-user-post/getUserPost";
import { GetUserPostController } from "../controllers/get-user-post/getUserPost";
import { GetAllPostsRepository } from "../repositories/get-all-posts/getAllPosts";
import { GetAllPostsController } from "../controllers/get-all-posts/getAllPosts";
import { GetUserPostsParams } from "../controllers/get-user-post/protocols";
import { CreatePostParams } from "../controllers/create-post/protocols";
import { UpdatePostParams } from "../controllers/update-post/protocols";
import { UpdatePostController } from "../controllers/update-post/updatePost";
import { UpdatePostRepository } from "../repositories/update-post/updatePost";
import { DeletePostParams } from "../controllers/delete-post/protocols";
import { DeletePostRepository } from "../repositories/delete-post/deletePost";
import { DeletePostController } from "../controllers/delete-post/deletePost";

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get("/", async (request, reply) => {
    const getAllPostsRepository = new GetAllPostsRepository();
    const getAllPostsController = new GetAllPostsController(
      getAllPostsRepository
    );

    const { body, statusCode } = await getAllPostsController.handle();
    reply.status(statusCode).send(body);
  });

  fastify.get("/post/:email", async (request, reply) => {
    const Params = request.params as GetUserPostsParams;
    const getUserPostRepository = new GetUserPostRepository();
    const getUserPostController = new GetUserPostController(
      getUserPostRepository
    );

    const { body, statusCode } = await getUserPostController.handle({
      params: Params,
    });
    reply.status(statusCode).send(body);
  });

  fastify.post("/post", async (request, reply) => {
    const Body = request.body as CreatePostParams;

    const createPostRepository = new CreatePostRepository();
    const createPostController = new CreatePostController(createPostRepository);

    try {
      const { statusCode, body } = await createPostController.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error);
    }
  });

    fastify.patch("/post/:id", async (request, reply) => {
      const Body = request.body as UpdatePostParams;
      const Params = request.params as UpdatePostParams;

      try {
        const updatePostRepository = new UpdatePostRepository();
        const updatePostController = new UpdatePostController(updatePostRepository);
  
        const {body, statusCode} = await updatePostController.handle({
          params: Params,
          body: Body,
        })

        reply.status(statusCode).send(body);
      }
      catch (error) {
        reply.send(error);
      }
  });

  fastify.delete("/post/:id", async (request, reply) => {
    const Params = request.params as DeletePostParams;

    try {
      const deletePostRepository = new DeletePostRepository();
      const deletePostController = new DeletePostController(deletePostRepository);

      const {body, statusCode} = await deletePostController.handle({
        params: Params
      })

      reply.status(statusCode).send(body);
      }
     catch (error) {
      reply.send(error); 
    }
  });
}