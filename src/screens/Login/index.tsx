import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PublicStackParamsList } from "@/routes/PublicRoutes";

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
