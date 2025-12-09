import { SnackbarContextProvider } from "@/context/snackbar.context";
import { AuthContextProvider } from "@/context/auth.context";
import NavigationRoutes from "@/routes";
import "./src/styles/global.css";
import { Snackbar } from "@/components/Snackbar";
import { BottomSheetContextProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetContextProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetContextProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
