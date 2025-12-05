import { createStackNavigator } from "@react-navigation/stack";

import { Register } from "@/screens/Register";
import { Home } from "@/screens/Home";

export type PrivateStackParamsList = {
  Home: undefined;
};


export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<PrivateStackParamsList>();
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
};
