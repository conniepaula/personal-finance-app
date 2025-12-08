import { AppButton } from "@/components/AppButton";
import { useAuthContext } from "@/context/auth.context";
import { View } from "react-native";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center">
      <AppButton onPress={handleLogout}>Log Out</AppButton>
    </View>
  );
};
