import { FastifyInstance } from "fastify";
import { CreateLikeRepository } from "../repositories/create-like/createLike";
import { CreateLikeController } from "../controllers/create-like/createLike";
import { createLikeParams } from "../controllers/create-like/protocols";

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
}