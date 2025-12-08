import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { schema } from "./schema";
import { useAuthContext } from "@/context/auth.context";
import { AxiosError } from "axios";

export interface RegisterFormParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const { handleRegister } = useAuthContext();

  const onSubmit = async (formData: RegisterFormParams) => {
    try {
      await handleRegister(formData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="Name"
        placeholder="Jane Smith"
        leftIconName="person"
      />
      <AppInput
        control={control}
        name="email"
        label="Email"
        placeholder="yourname@example.com"
        leftIconName="email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AppInput
        control={control}
        name="password"
        label="Password"
        placeholder="********"
        leftIconName="lock"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="********"
        leftIconName="lock"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-4 min-h-[180px]">
        <AppButton onPress={handleSubmit(onSubmit)}>Sign Up</AppButton>
        <View>
          <Text className="text-base mb-6 text-gray-300">
            Already have an account?
          </Text>
          <AppButton
            onPress={() => navigation.navigate("Login")}
            variant="outline"
          >
            Login
          </AppButton>
        </View>
      </View>
    </>
  );
};
