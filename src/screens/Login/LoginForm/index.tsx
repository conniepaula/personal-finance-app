import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";

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
      <AppInput control={control} name="email" label="Email"  placeholder="yourname@example.com" leftIconName="email"/>
      <AppInput control={control} name="password" label="Password"  placeholder="********" leftIconName="lock" secureTextEntry={true}/>
    </>
  );
};
