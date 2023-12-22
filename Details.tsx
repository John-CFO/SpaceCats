////////////////////details stack/////////////////////

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { heartBTN, splashBTN } from "./assets";
import { NotFound } from "./assets";
import CommentSection from "./components/CommentSection";
import { commentData } from "./components/Users";

//////////////////////////////////////////////////////////////////////////////////////////////

//stack typography
type RootStackParamList = {
  Collection: undefined;
  Details: { imageUrl: string };
};

//typography for detailscreen navigation declaration (StackNavigationProp)
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Details"
>;
//typography for detailscreen navigation declaration (RootStackParamList)
type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

const Details: React.FC = () => {
  //passing data from collection.tsx to details.tsx
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const imageUrl = route?.params?.imageUrl;
  console.log("Route params - imageUrl:", imageUrl);

  /*--voting function--*/

  //declared Ref for "upvote" and "downvote" button
  const upvoteButtonRef = useRef(null);
  const downvoteButtonRef = useRef(null);

  //initialized state for "upvote", "downvote" and animation
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [animation, setAnimation] = useState(null);

  //function for button animation
  const animateButton = (buttonRef: React.RefObject<Animatable.View>) => {
    const currentButtonRef = buttonRef.current; //reference for the button from Ref

    //checking the Ref and the rubberBand function
    if (currentButtonRef && typeof currentButtonRef.rubberBand === "function") {
      currentButtonRef.rubberBand(1000); //execute the animation with a timing of 1000 milliseconds
    }
  };

  /*--counter for voting section--*/

  //function that handle the button counter
  const handleToggleVote = (voteType: "up" | "down") => {
    //upvote function
    if (voteType === "up") {
      setUpvotes((prevUpvotes) => Math.max(prevUpvotes + 1, 0)); //upvote counter jumped +1
      animateButton(upvoteButtonRef); //execute the animation if user pressed the button
    }

    //downvote function
    else if (voteType === "down") {
      setDownvotes((prevDownvotes) => Math.max(prevDownvotes + 1, 0)); //downvote counter jumped +1
      animateButton(downvoteButtonRef); //execute the animation if user pressed the button
    }

    //function that regulated the animation time
    setTimeout(() => {
      setAnimation(null);
    }, 1000);
  };

  /*--bottom sheet modal section--*/

  //references
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  //variables
  const snapPoints = useMemo(() => ["35%", "50%"], []);
  //callbacks
  const handlePrensentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleLike = (commentId: number) => {
    //logik für like
  };

  return (
    <ImageBackground
      source={require("./assets/background_dark.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/*--image container section--*/}

        <View
          style={{
            marginTop: 40,
            width: "100%",
            height: 440,

            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              position: "relative",
              alignItems: "center",
            }}
          >
            {/*--image view section--*/}

            <View style={{ alignItems: "center" }}>
              {/*-- X-button (go to collection)--*/}
              <TouchableOpacity
                onPress={() => navigation.navigate("Collection")}
                style={{
                  position: "absolute",
                  zIndex: +1,
                  top: 15,
                  right: 15,
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  borderColor: "lightgray",
                  borderWidth: 4,
                  backgroundColor: "red",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    bottom: 2,
                    color: "lightgray",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              {/*--image container--*/}
              <View
                style={{
                  borderWidth: 4,
                  borderColor: "white",
                  borderRadius: 15,
                  width: 400,
                  height: 340,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                  overflow: "hidden",
                }}
              >
                <View style={{ borderRadius: 4 }}>
                  <Image
                    style={{ width: "100%", height: 330 }}
                    source={{ uri: imageUrl }}
                  />
                </View>
              </View>
            </View>

            {/*--voting secition--*/}

            <View style={{ flexDirection: "row", gap: 30, padding: 20 }}>
              {/*--heart button--*/}
              <TouchableOpacity onPress={() => handleToggleVote("up")}>
                <Animatable.View
                  ref={upvoteButtonRef}
                  animation="rubberBand"
                  duration={1000}
                >
                  <Image source={heartBTN} style={{ width: 60, height: 60 }} />
                </Animatable.View>
              </TouchableOpacity>
              {/*--counter--*/}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {upvotes}
                </Text>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "lime",
                  }}
                >
                  {downvotes}
                </Text>
              </View>
              {/*--splash button--*/}
              <TouchableOpacity onPress={() => handleToggleVote("down")}>
                <Animatable.View
                  ref={downvoteButtonRef}
                  animation="rubberBand"
                  duration={1000}
                >
                  <Image source={splashBTN} style={{ width: 60, height: 60 }} />
                </Animatable.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*--comment section--*/}

        {/*--BottomSheetModal and the navigation button--*/}

        <BottomSheetModalProvider>
          {/*--button to comment section--*/}
          <Animatable.View
            animation={"bounceInUp"}
            easing={"ease-in-out"}
            duration={2000}
          >
            <TouchableOpacity onPress={handlePrensentModalPress}>
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
                    fontSize: 16,
                    color: "pink",
                    paddingHorizontal: 28,
                    paddingVertical: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    borderRadius: 8,
                    backgroundColor: "transparent",
                  }}
                >
                  leave a comment
                </Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{ backgroundColor: "dimgray" }}
          >
            <CommentSection comments={commentData as any} onLike={handleLike} />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Details;
