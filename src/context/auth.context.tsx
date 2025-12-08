import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authService from "@/shared/services/personal-finance/auth.service";
import { LoginFormParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import { IUser } from "@/shared/interfaces/user-inteface";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: LoginFormParams) => {
    const { token, user } = await authService.authenticate(userData);
    await AsyncStorage.setItem(
      "personal-finance-user",
      JSON.stringify({ user, token })
    );
    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: RegisterFormParams) => {
    const { token, user } = await authService.register(formData);
    await AsyncStorage.setItem(
      "personal-finance-user",
      JSON.stringify({ user, token })
    );
    setUser(user);
    setToken(token);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear()
    setUser(null);
    setToken(null);
  };

  const restoreUserSession = async (): Promise<string | null> => {
    const userData = await AsyncStorage.getItem("personal-finance-user");
    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession
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
