import { FastifyInstance } from "fastify";
import { CreatePostRepository } from "../repositories/create-post/createPost";
import { CreatePostController } from "../controllers/create-post/createPost";
import { GetUserPostRepository } from "../repositories/get-user-post/getUserPost";
import { GetUserPostController } from "../controllers/get-user-post/getUserPost";
import { GetAllPostsRepository } from "../repositories/get-all-posts/getAllPosts";
import { GetAllPostsController } from "../controllers/get-all-posts/getAllPosts";
import { GetUserPostsParams } from "../controllers/get-user-post/protocols";
import { CreatePostParams } from "../controllers/create-post/protocols";

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
    const Params = request.params as GetUserPostsParams
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
        body: Body
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error);
    }
  });
}
