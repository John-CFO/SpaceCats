/////////////////root stack as App.tsx///////////////////

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Onboarding from "./Onboarding";
import Collection from "./Collection";
import Details from "./Details";

////////////////////////////////////////////////////////////////////////////////////////

//declared the stack navigator from React.Navigation
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
