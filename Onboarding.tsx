////////////////onboarding stack//////////////////

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { StackNavigationProp } from "@react-navigation/stack";

////////////////////////////////////////////////////////////////////////////////////////

//use RootStackParamList for checking the routing types
type RootStackParamList = {
  Collection: undefined;
};

const Onboarding = () => {
  //useNativation to navigate to the "Collection" stack
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require("./assets/background_light.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            zIndex: -2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*--app logo as background image--*/}
          <Image
            source={require("./assets/logo-background.png")}
            style={{ width: 380, height: 380 }}
          />
        </View>
        {/*--onboarding button to join in--*/}
        <TouchableOpacity
          style={{ overflow: "hidden" }}
          onPress={() => navigation.navigate("Collection")} //navigate to "Collection"
        >
          {/*--Animatable to manipulate the button effect--*/}
          <Animatable.View
            animation={"pulse"}
            easing={"ease-in-out"}
            iterationCount={"infinite"}
          >
            <View
              style={{
                marginTop: 60,
                paddingHorizontal: 110,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginBottom: 100,
                  fontWeight: "bold",
                  fontSize: 26,
                  color: "pink",
                  paddingHorizontal: 28,
                  paddingVertical: 10,
                  borderWidth: 2,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  backgroundColor: "transparent",
                }}
              >
                Join in
              </Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>
        {/*--StatusBar to manipulate the statusbar layout--*/}
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Onboarding;
