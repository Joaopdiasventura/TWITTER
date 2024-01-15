import { Router } from "express";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-createUser";
import { MongoGetUserRepository } from "../repositories/get-users/mongo-getUsers";
import { GetUsersController } from "../controllers/get-users/getUsers";
import { CreateUserController } from "../controllers/create-user/createUser";
import { MongoUpdateUserRepository } from "../repositories/update-user/mongo-UpdateUser";
import { UpdateUserController } from "../controllers/update-user/updateUser";
import { MongoDeleteUserRepository } from "../repositories/delete-user/mongo-DeleteUser";
import { DeleteUserControler } from "../controllers/delete-user/delete-user";

const user = Router();

user.get("/", async (req, res) =>{
    const mongoGetUserRepository = new MongoGetUserRepository();

    const getUsersController = new GetUsersController(mongoGetUserRepository);

    const {statusCode, body} = await getUsersController.handle();

    return res.status(statusCode).send(body);
});

user.post("/user", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(mongoCreateUserRepository);
    
    const {body, statusCode} = await createUserController.handle({body: req.body});

    
    return res.status(statusCode).send(body);
});

user.patch("/user/:email", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const {body, statusCode} = await updateUserController.handle({
        body: req.body,
        params: req.params
    });

    return res.status(statusCode).send(body);
});

user.delete("/user/:email", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserControler(mongoDeleteUserRepository);

    const {body, statusCode} = await deleteUserController.handle({
        params: req.params
    });

    return res.status(statusCode).send(body);
});

export default user;