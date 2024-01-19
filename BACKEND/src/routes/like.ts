import { FastifyInstance } from "fastify";
import { CreateLikeRepository } from "../repositories/create-like/createLike";
import { CreateLikeController } from "../controllers/create-like/createLike";
import { createLikeParams } from "../controllers/create-like/protocols";
import { GetLikesParams } from "../controllers/getLikes/protocols";
import { GetLikesRepository } from "../repositories/get-likes/getLikes";
import { GetLikesController } from "../controllers/getLikes/getLikes";

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post("/like", async (request, reply) => {
    const Body = request.body as createLikeParams;

    if (!Body || !Body.creator || !Body.post) {
      return reply
        .status(400)
        .send({ message: "Missing required fields: creator and post" });
    }

    const createLikeRepository = new CreateLikeRepository();
    const createLikeController = new CreateLikeController(createLikeRepository);

    try {
      const { body, statusCode } = await createLikeController.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/likes/:post", async (request, reply) => {
    const Params = request.params as GetLikesParams;

    const getLikesRepository = new GetLikesRepository();
    const getLikesController = new GetLikesController(getLikesRepository);

    try {
      const {body, statusCode} = await getLikesController.handle({
        params: Params
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error)
    }
  });
}