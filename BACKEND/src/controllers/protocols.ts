import { User } from "../models/user";
export interface HttpResponse <T>{
    statusCode:number;
    body: T | object;
}

export interface HttpRequest <T>{
    params?: T;
    body?: T;
}

export interface IController {
    handle(request: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface PassportRequest<T> extends HttpRequest<T> {
  user?: User;
  logIn(user: User, callback: (err?: Error) => void): void;
}