import { IUser } from "../user-inteface";

export interface IAuthenticateResponse {
  user: IUser;
  token: string;
}
