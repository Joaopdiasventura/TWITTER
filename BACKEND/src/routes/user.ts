import { Router } from "express";
import { CreateUserRepository } from "../repositories/create-user/createUser";
import { GetUserRepository } from "../repositories/get-users/getUsers";
import { GetUsersController } from "../controllers/get-users/getUsers";
import { CreateUserController } from "../controllers/register-user/createUser";
import { UpdateUserRepository } from "../repositories/update-user/updateUser";
import { UpdateUserController } from "../controllers/update-user/updateUser";
import { DeleteUserRepository } from "../repositories/delete-user/deleteUser";
import { DeleteUserControler } from "../controllers/delete-user/delete-User";
import { PassportRequest } from "../controllers/protocols";
import { ControllerLogUser } from "../controllers/log-user/logUser";
import { logParams } from "../controllers/log-user/protocols";

const user = Router();

user.get("/", async (req, res) => {
  const getUserRepository = new GetUserRepository();

  const getUsersController = new GetUsersController(getUserRepository);

  const { statusCode, body } = await getUsersController.handle();

  return res.status(statusCode).send(body);
});

user.post("/user", async (req, res) => {
  const createUserRepository = new CreateUserRepository();

  const createUserController = new CreateUserController(
    createUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  return res.status(statusCode).send(body);
});

user.patch("/user/:email", async (req, res) => {
  const updateUserRepository = new UpdateUserRepository();
  const updateUserController = new UpdateUserController(
    updateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  return res.status(statusCode).send(body);
});

user.delete("/user/:email", async (req, res) => {
  const deleteUserRepository = new DeleteUserRepository();
  const deleteUserController = new DeleteUserControler(
    deleteUserRepository
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });

  return res.status(statusCode).send(body);
});

user.post("/login", async (req, res) => {
    try {
        const controllerLogUser = new ControllerLogUser();
        const {body, statusCode} = await controllerLogUser.handle(req as unknown as PassportRequest<logParams>);

        res.status(statusCode).send(body);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default user;