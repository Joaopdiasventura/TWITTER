import { Router } from "express";
import { CreatePostRepository } from "../repositories/create-post/createPost";
import { CreatePostController } from "../controllers/create-post/createPost";
import { GetUserPostRepository } from "../repositories/get-user-post/getUserPost";
import { GetUserPostController } from "../controllers/get-user-post/getUserPost";

const post = Router();

post.get("/post/:email",async (req, res) => {
    const getUserPostRepository = new GetUserPostRepository();
    const getUserPostController = new GetUserPostController(getUserPostRepository);

    const {body, statusCode} = await getUserPostController.handle({
        params: req.params
    });

    return res.status(statusCode).send(body);
})

post.post("/post",async (req, res) => {
    const createPostRepository = new CreatePostRepository();
    const createPostController = new CreatePostController(createPostRepository);

    try {
        const {statusCode, body} = await createPostController.handle({
            body: req.body,
          })
        return res.status(statusCode).send(body);
    } catch (error) {
        return res.send(error)
    }

});

export default post;