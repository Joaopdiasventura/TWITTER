import { User } from "../../models/user";
import { sendUser } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class CreateUserController implements IController{
    constructor (private readonly createUserRepository: ICreateUserRepository) {}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<string>> {
        try {
            const {body} = httpRequest;

            const requiredsFields = ["name", "email", "password"]

            for (const fields of requiredsFields){
                if (!body[fields as keyof CreateUserParams]) {
                    return {
                        statusCode: 400,
                        body: {message:`preencha o campo de ${fields}`}
                    }
                }
            }

            
            const salt = 10;
            const hash = await bcrypt.hash(body.password, salt);

            body.password = hash;

            const user = await this.createUserRepository.createUser(body);

            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign(user, secretKey);

            return {
                statusCode: 200,
                body: token
              }

        } catch (error) {
            console.log(`${error}`);
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}