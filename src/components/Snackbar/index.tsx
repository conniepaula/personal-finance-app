import { useSnackbarContext } from "@/context/snackbar.context";
import React from "react";
import { Text, View } from "react-native";

export const Snackbar = () => {
  const { type, message } = useSnackbarContext();

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${type === "SUCCESS" ? "bg-accent-brand-background-primary" : "bg-accent-red-background-primary"}`;

  return (
    <View
      className={`absolute bottom-10 self-center w-[90%] h-[50px] rounded-xl ${bgColor} justify-center z-10 p-2`}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  );
};
