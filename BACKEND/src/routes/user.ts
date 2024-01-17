import { Router } from "express";
import { CreateUserRepository } from "../repositories/create-user/createUser";
import { CreateUserController } from "../controllers/register-user/createUser";
import { UpdateUserRepository } from "../repositories/update-user/updateUser";
import { UpdateUserController } from "../controllers/update-user/updateUser";
import { DeleteUserRepository } from "../repositories/delete-user/deleteUser";
import { DeleteUserControler } from "../controllers/delete-user/deleteUser";
import { PassportRequest } from "../controllers/protocols";
import { ControllerLogUser } from "../controllers/log-user/logUser";
import { logParams } from "../controllers/log-user/protocols";
import axios from "axios";
import { GetUsersRepository } from "../repositories/get-users/getUsers";
import { GetUsersController } from "../controllers/get-users/getUsers";

const app = axios.create({
  baseURL: "https://email-4ocx.onrender.com"
});

const user = Router();

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

user.get("/email/:email",async (req, res) => {
  try {
    const cod = (Math.random() * 999).toFixed(0);

    await app.post('/', {
        from: process.env.EMAIL,
        password: process.env.PASSWORD,
        to: req.params.email,
        title: 'CÓDIGO DE VERIFICAÇÃO DO TWITTER',
        content: cod
    });

    return res.status(200).send(cod);

} catch (error) {
    return res.send('Erro ao enviar o email:' + error);
}
})

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
  console.log(req.body);
    try {
        const controllerLogUser = new ControllerLogUser();
        const {body, statusCode} = await controllerLogUser.handle(req as unknown as PassportRequest<logParams>);

        res.status(statusCode).send(body);
    } catch (error) {
        res.status(500).send(error);
    }
});

user.get("/search/:name",async (req, res) => {
  try {

    const getUsersRepository = new GetUsersRepository();
    const getUsersController = new GetUsersController(getUsersRepository);

    const { body , statusCode} = await getUsersController.handle({
      body: req.params
    })

    res.status(statusCode).send(body);

  } catch (error) {
    return res.send(error)
  }
})

export default user;