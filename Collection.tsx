///////////////collection stack/////////////////

import { View, Text, Image, StatusBar, StyleSheet, FlatList} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { fetchCatImages } from "./API";
import ItemContainer from "./components/ItemContainer";
import { NotFound } from "./assets";

////////////////////////////////////////////////////////////////////////////////////////////

/*--navigation to send images to the details screen and navigate between the stacks--*/

//stack navigation typography
type RootStackParamList = {
  Collection: undefined;
  Details: { imageUrl: string };
};

//typography for declaration (StackNavigationProp)
type CollectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Collection"
>;

//
interface CollectionProps {
  navigation: CollectionScreenNavigationProp;
}

const Collection: React.FC<CollectionProps> = ({ navigation }) => {
  //passing data from flatlist to <Image/> on details.tsx
  const navigateToDetails = (imageUrl: string) => {
    console.log("Navigating to details with imageUrl:", imageUrl);
    navigation.navigate("Details", {
      imageUrl,
    });
  };

  //useLayouteffect to disable the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //data fetching from API

  //initializing the function that fetched the API data to the clientside
  const [CatImages, setCatImages] = useState<{ id: string; url: string }[]>([]);

  //initialize loading function, when no data from API is requested
  const [isLoading, setIsLoading] = useState(false);

  //this function fetched the data from the API and catched the failed request
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const images = await fetchCatImages(page);
        console.log("API response", images);
        setCatImages(images);
      } catch (error) {
        console.error("Error fetch images", error);
        setCatImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  //this function loads more images when flatlist ends
  const moreImages = async () => {
    try {
      setIsLoading(true);
      const moreImages = await fetchCatImages(page);
      setCatImages((prevImages) => [...prevImages, ...moreImages]);
    } catch (error) {
      console.error("Error loading more images", error);
    } finally {
      setIsLoading(false);
    }
  };

  //changed the data state
  //if you exclute this line, the "Oops, found no data" screen will be visible
  const [page, setPage] = useState(1);

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#191919",
        }}
      >
        {/*--HEADING SECTION--*/}
        <View
          style={{
            height: 150,
            backgroundColor: "#191919",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/*--H1--*/}
          <View style={styles.container}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 38,
                fontWeight: "bold",
                color: "pink",
              }}
            >
              Co<Text style={styles.highlightedText}>ll</Text>ection
            </Text>
          </View>
          {/*--H3--*/}
          <Text
            style={{
              marginBottom: 50,
              fontSize: 18,
              fontWeight: "bold",
              color: "pink",
            }}
          >
            click any picture, vote, comment and smile
          </Text>
        </View>

        {/*--NO DATA FOUND SECTION--*/}
        {CatImages.length === 0 && !isLoading ? ( //no data found
          <View
            style={{
              width: 400,
              height: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={NotFound} style={{ width: 120, height: 120 }} />
            <Text style={{ fontSize: 25, color: "mediumvioletred" }}>
              Oops, found no data
            </Text>
          </View>
        ) : //--------LOADING SECTION
        isLoading ? (
          <View style={{ height: 400, width: 400, alignItems: "center" }}>
            <LottieView
              source={require("./assets/lottie_animation/cat-climber.json")}
              autoPlay
              loop
            />

            <Text
              style={{
                color: "mediumvioletred",
                fontSize: 15,
              }}
            >
              LOADING
            </Text>
          </View>
        ) : (
          //--------IMAGE LIST SECTION
          <View style={{ flex: 1, justifyContent: "center" }}>
            <FlatList
              data={CatImages}
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
              //importent for load more data if the list ended
              onEndReached={moreImages}
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
        backgroundColor="#191919"
        barStyle="light-content"
      />
    </SafeAreaView>
  );
};

//stylesheet for violet header highlight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  highlightedText: {
    color: "mediumvioletred",
  },
});

export default Collection;
