import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import * as authService from "@/shared/services/personal-finance/auth.service";
import { LoginFormParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import { IUser } from "@/shared/interfaces/user-inteface";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: LoginFormParams) => {
    const { token, user } = await authService.authenticate(userData);
    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: RegisterFormParams) => {
    const { token, user } = await authService.register(formData);
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
