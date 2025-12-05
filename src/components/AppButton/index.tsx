import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

import { colors } from "@/shared/colors";

type AppButtonVariant = "fill" | "outline";

interface AppButtonProps extends TouchableOpacityProps {
  variant?: AppButtonVariant;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton: FC<PropsWithChildren<AppButtonProps>> = ({
  children,
  variant = "fill",
  iconName,
  ...rest
}) => {
  const isFill = variant === "fill";
  return (
    <TouchableOpacity
      className={clsx(
        "w-full rounded-xl px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFill,
          "bg-none border border-accent-brand": !isFill,
        }
      )}
      {...rest}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isFill,
          "text-accent-brand": !isFill,
        })}
      >
        {children}
      </Text>

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  );
};
