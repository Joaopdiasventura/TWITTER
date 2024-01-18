import axios from "axios";
import { FastifyInstance } from "fastify";
import { CreateUserRepository } from "../repositories/create-user/createUser";
import { CreateUserController } from "../controllers/register-user/createUser";
import { UpdateUserRepository } from "../repositories/update-user/updateUser";
import { UpdateUserController } from "../controllers/update-user/updateUser";
import { DeleteUserRepository } from "../repositories/delete-user/deleteUser";
import { DeleteUserControler } from "../controllers/delete-user/deleteUser";
import { GetUsersRepository } from "../repositories/get-users/getUsers";
import { GetUsersController } from "../controllers/get-users/getUsers";
import { CreateUserParams } from "../controllers/register-user/protocols";
import { GetUserPostsParams } from "../controllers/get-user-post/protocols";
import { GetUsersParams } from "../controllers/get-users/protocols";
import { logParams } from "../controllers/log-user/protocols";
import { ControllerLogUser } from "../controllers/log-user/logUser";

export default async function (fastify: FastifyInstance): Promise<void> {
  const app = axios.create({
    baseURL: "https://email-4ocx.onrender.com",
  });

  fastify.post("/user", async (request, reply) => {
    const Body = request.body as CreateUserParams;

    const createUserRepository = new CreateUserRepository();
    const createUserController = new CreateUserController(createUserRepository);
    const { body, statusCode } = await createUserController.handle({
      body: Body,
    });
    reply.status(statusCode).send(body);
  });

  fastify.get("/email/:email", async (request, reply) => {
    try {
      const Params = request.params as GetUserPostsParams;
      const cod = (Math.random() * 999).toFixed(0);
      await app.post("/", {
        from: process.env.EMAIL,
        password: process.env.PASSWORD,
        to: Params,
        title: "CÓDIGO DE VERIFICAÇÃO DO TWITTER",
        content: cod,
      });
      reply.status(200).send(cod);
    } catch (error) {
      reply.send("Erro ao enviar o email: " + error);
    }
  });

  fastify.patch("/user/:email", async (request, reply) => {
    const updateUserRepository = new UpdateUserRepository();
    const updateUserController = new UpdateUserController(updateUserRepository);
    const { body, statusCode } = await updateUserController.handle({
      body: request.body,
      params: request.params,
    });
    reply.status(statusCode).send(body);
  });

  fastify.delete("/user/:email", async (request, reply) => {
    const deleteUserRepository = new DeleteUserRepository();
    const deleteUserController = new DeleteUserControler(deleteUserRepository);
    const { body, statusCode } = await deleteUserController.handle({
      params: request.params,
    });
    reply.status(statusCode).send(body);
  });

  fastify.get("/search/:name", async (request, reply) => {
    const Params = request.params as GetUsersParams;

    try {
      const getUsersRepository = new GetUsersRepository();
      const getUsersController = new GetUsersController(getUsersRepository);
      const { body, statusCode } = await getUsersController.handle({
        body: Params,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post("/login", async (request, reply) => {
    const Body = request.body as logParams;
    try {
      const controllerLogUser = new ControllerLogUser();
      const { body, statusCode } = await controllerLogUser.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.send(error);
    }
  });
}