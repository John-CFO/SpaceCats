//////////////Item-Container for colletion(flatlist)////////////////

import { Image, TouchableOpacity, GestureResponderEvent } from "react-native";
import React from "react";

////////////////////////////////////////////////////////////////////

//typography for imageSrc object
interface ItemContainerProps {
  imageSrc: string;
  onPress?: (event: GestureResponderEvent) => void;
}

///////////////////////////////////////////////////////////////////

const ItemContainer: React.FC<ItemContainerProps> = ({
  imageSrc,
  onPress,
}: ItemContainerProps) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 15,
        borderColor: "grey",
        borderWidth: 1,
        backgroundColor: "white",
        width: 182,
        paddingHorizontal: 2,
        paddingVertical: 2,
      }}
      onPress={onPress}
    >
      <Image
        style={{ width: "100%", height: 150, borderRadius: 15 }}
        source={{ uri: imageSrc }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ItemContainer;
