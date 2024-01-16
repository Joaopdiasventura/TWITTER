import passport from "passport";
import { PassportRequest, HttpResponse, IController } from "../protocols";
import { logParams } from "./protocols";
import { User } from "../../models/user";

export class ControllerLogUser implements IController {
  async handle(request: PassportRequest<logParams>): Promise<HttpResponse<User>> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user: User, info) => {
        if (err) {
          console.error(err);
          reject({ statusCode: 500, body: { error: err } });
          return;
        }
        if (!user) {
          console.error(info);
          reject({ statusCode: 401, body: { error: info } });
          return;
        }

        request.logIn(user, (err) => {
          if (err) {
            console.error(err);
            reject({ statusCode: 500, body: { error: err } });
            return;
          }
          resolve({ statusCode: 200, body: user });
        });
      })(request);
    });
  }
}