import { User } from "../../models/user";

export interface logParams {
  email: string;
  password: string;
}

export interface IlogUser {
  logar(logParams): Promise<User>;
}