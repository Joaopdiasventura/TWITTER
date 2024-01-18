import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { DecodeParams } from "./protocols";
import jwt from "jsonwebtoken";

export class DecodeController implements IController {
    async handle(request: HttpRequest<DecodeParams>): Promise<HttpResponse<User>> {
        try {
            const { token } = request.body;
            const decoded = jwt.verify(token, process.env.SECRET_KEY) as User;

            return {
                statusCode: 200,
                body: decoded
            };

        } catch (err) {
            console.error('Erro na verificação do token:', err);
            return {
                statusCode: 400,
                body: { message: 'Invalid token' }
            };
        }
    }
}
