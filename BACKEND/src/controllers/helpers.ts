import { User } from "../models/user";
import { HttpResponse } from "./protocols";

export const sendUser = (cod: number, body?: HttpResponse<User>['body']) => {
    return {
        statusCode: cod,
        body: body
    };
};
