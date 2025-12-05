import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";

export interface LoginFormParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="Email"
        placeholder="yourname@example.com"
        leftIconName="email"
      />
      <AppInput
        control={control}
        name="password"
        label="Password"
        placeholder="********"
        leftIconName="lock"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward">Login</AppButton>
        <View>
          <Text className="text-base mb-6 text-gray-300">Don't have an account?</Text>
          <AppButton onPress={() => navigation.navigate("Register")} iconName="arrow-forward" variant="outline">
            Sign Up
          </AppButton>
        </View>
      </View>
    </>
  );
};
