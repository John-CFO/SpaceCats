/////////////////root stack as App.tsx///////////////////

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Onboarding from "./Onboarding";
import Collection from "./Collection";
import Details from "./Details";

////////////////////////////////////////////////////////////////////////////////////////

//declared the stack navigator from React.Navigation
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Collection"
                component={Collection}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Details"
                component={Details}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
