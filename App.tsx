import { AuthContextProvider } from "@/context/auth.context";
import NavigationRoutes from "@/routes";
import "./src/styles/global.css";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
