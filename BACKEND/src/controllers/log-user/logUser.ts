import { HttpRequest, HttpResponse, IController } from "../protocols";
import { logParams } from "./protocols";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import prisma from "../../services/prisma";

export class ControllerLogUser implements IController {
  async handle(request: HttpRequest<logParams>): Promise<HttpResponse<string>> {
    const {body} = request 
    const user = await prisma.user.findFirst({
      where:{
        email: body.email
      }
    })

    if (!user) {
      return {
        statusCode: 400,
        body: {mensage: "Essa conta não existe"}
      }
    }

    const passwordConfirm = bcrypt.compare(body.password, (await user).password)

    if (!passwordConfirm) {
      return {
        statusCode: 400,
        body: {mensage: "Senha incorreta"}
      }
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: token
    }
  }
}