import { LoginFormParams } from "@/screens/Login/LoginForm";
import { personalFinanceApi } from "@/shared/api/personal-finance";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

export const authenticate = async (userData: LoginFormParams): Promise<IAuthenticateResponse> => {
  const { data } = await personalFinanceApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );

  return data;
};
