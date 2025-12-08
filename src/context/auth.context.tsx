import { LoginFormParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  user: null;
  token: string | null;
  handleAuthentication: (params: LoginFormParams) => Promise<void>;
  handleRegistration: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthentication = async ({ email, password }: LoginFormParams) => {
    // TODO: Implement login logic here
  };

  const handleRegistration = async (params: RegisterFormParams) => {};

  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthentication,
        handleRegistration,
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
