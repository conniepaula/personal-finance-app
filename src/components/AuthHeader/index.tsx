import { useIsKeyboardVisible } from "@/shared/hooks/useIsKeyboardVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const isKeyboardVisible = useIsKeyboardVisible();
  if (isKeyboardVisible) {
    return <></>;
  }
  
  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
        source={require("@/assets/logo.png")}
        className="h-[48px] w-[255px]"
      />
    </View>
  );
};
