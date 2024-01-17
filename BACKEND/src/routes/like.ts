import { Router } from "express";
import { CreateLikeRepository } from "../repositories/create-like/createLike";
import { CreateLikeController } from "../controllers/create-like/createLike";

const like = Router();

like.post("/like", async (req, res) => {
    const createLikeRepository = new CreateLikeRepository();
    const createLikeController = new CreateLikeController(createLikeRepository);

    try {
        const {body, statusCode} = await createLikeController.handle({
            body: req.body
        });
        return res.status(statusCode).send(body);
    } catch (error) {
        return res.send(error)
    }
});

export default like;