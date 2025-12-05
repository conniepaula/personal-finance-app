import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

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
        secureTextEntry={true}
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward">Login</AppButton>
        <View>
          <Text className="text-base mb-6 text-gray-300">Don't have an account?</Text>
          <AppButton iconName="arrow-forward" variant="outline">
            Sign Up
          </AppButton>
        </View>
      </View>
    </>
  );
};
