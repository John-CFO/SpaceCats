import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Collection = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Collection</Text>
    </View>
  );
};

export default Collection;
