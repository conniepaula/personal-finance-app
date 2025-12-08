import { SnackbarContextProvider } from "@/context/snackbar.context";
import { AuthContextProvider } from "@/context/auth.context";
import NavigationRoutes from "@/routes";
import "./src/styles/global.css";
import { Snackbar } from "@/components/Snackbar";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
