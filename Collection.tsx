//////////////////////////////collection stack////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import axios from "axios";

import ItemContainer from "./components/ItemContainer";
import { NotFound } from "./assets";

/////////////////////////////////////////////////////////////////////////////////

//typography from the stack navigation
type RootStackParamList = {
  Collection: undefined;
  Details: { imageUrl: string };
};

//typography from stacknavigationprop for the nav. to "Collection"
type CollectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Collection"
>;

//object typography for the cat images as object (json)
interface CollectionProps {
  navigation: CollectionScreenNavigationProp;
}

///////////////////////////////////////////////////////////////////////////////////

//base URL for fetching images from the backend server
const API_URL = "http://192.168.178.26:8021";

const Collection: React.FC<CollectionProps> = ({ navigation }) => {
  //change state to load the images
  const [load, setLoad] = useState<number>(1);
  const [catImages, setCatImages] = useState<{ id: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //function to fetch the images with axios
  const fetchImages = async (
    load: number
  ): Promise<{ id: string; url: string }[]> => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          load,
          limit: 24, //change the limit to load more images from api
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching images", error);
      throw error;
    }
  };
  //useEffect for initial data fetching on component mount
  useEffect(() => {
    fetchImagesData();
  }, []);

  //function to handle the data loading and error catching
  const fetchImagesData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const images = await fetchImages(load);
      console.log("API response", images);

      setCatImages(images);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images", error);
      setCatImages([]);
      setError("Failed to fetch ImageBase. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //function to load morge images if the user scrolled to the end of screen
  const moreImages = async () => {
    try {
      setIsLoading(true);
      const moreImagesData = await fetchImages(load + 1);

      setCatImages((prevImages) => [...prevImages, ...moreImagesData]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading more images", error);
    } finally {
      setIsLoading(false);
    }
  };

  //function for the refresh button
  const handleRefresh = () => {
    setLoad(load + 1); //change value for a new request
    fetchImagesData();
  };

  //navigation function to send the image data to the detailscreen
  const navigateToDetails = (imageUrl: string) => {
    console.log("Navigating to details with imageUrl:", imageUrl);
    navigation.navigate("Details", {
      imageUrl,
    });
  };

  return (
    <ImageBackground
      source={require("./assets/background_dark.png")}
      style={{ flex: 1, justifyContent: "center", width: "100%" }}
    >
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/*--HEADING SECTION--*/}
          <View
            style={{
              height: 150,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/*--H1--*/}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 38,
                  fontFamily: "MontserratAlternatesBold",
                  color: "pink",
                }}
              >
                Co<Text style={{ color: "hotpink" }}>ll</Text>ection
              </Text>
            </View>
            {/*--H3--*/}
            <Text
              style={{
                marginBottom: 50,
                fontSize: 17,

                fontFamily: "MontserratAlternatesRegular",
                color: "pink",
              }}
            >
              click any picture, vote, comment and smile
            </Text>
          </View>

          {/*--NO DATA FOUND SECTION--*/}
          {catImages.length === 0 && !isLoading ? ( //no data found
            <View
              style={{
                width: "100%",
                height: 800,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={NotFound} style={{ width: 120, height: 120 }} />
              <Text
                style={{
                  fontSize: 25,
                  color: "hotpink",
                  fontFamily: "MontserratAlternatesRegular",
                }}
              >
                Oops, found no data
              </Text>

              <View
                style={{
                  marginTop: 120,
                  paddingHorizontal: 110,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/*--refresh button--*/}
                <TouchableOpacity onPress={handleRefresh}>
                  <Text
                    style={{
                      marginBottom: 100,
                      fontFamily: "MontserratAlternatesBold",
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
                    Refresh
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : ///////////////LOADING SECTION
          isLoading ? (
            <View
              style={{
                height: 700,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 130,
                  color: "hotpink",
                  fontSize: 15,
                  fontFamily: "MontserratAlternatesRegular",
                }}
              >
                LOADING
              </Text>
              <LottieView
                source={require("./assets/lottie_animation/cat-climber.json")}
                autoPlay
                loop
                style={{ width: 400, height: 400 }}
              />
            </View>
          ) : (
            /////////////IMAGE LIST SECTION
            <View style={{ flex: 1, justifyContent: "center" }}>
              <FlatList
                data={catImages}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, padding: 12, alignItems: "center" }}>
                    <ItemContainer
                      onPress={() => navigateToDetails(item.url)}
                      key={item.id}
                      imageSrc={item.url}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} //importent for fetch data from API
                onEndReached={moreImages} //importent to load more data if the list ended
                initialNumToRender={5}
                onEndReachedThreshold={0.1}
                contentContainerStyle={{ justifyContent: "center" }}
                style={{ flex: 1 }}
              />
            </View>
          )}
        </View>
        {/*--statusbar styleing--*/}
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Collection;
