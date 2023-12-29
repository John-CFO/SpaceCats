///////////////////////////users///////////////////////////////////

import { ImageSourcePropType } from "react-native";

///////////////////////////////////////////////////////////////////

//user objects typography
export interface CommentProfile {
  id: string;
  user: string;
  profilePicture: ImageSourcePropType;
  text: string;
}

/////////////////////////////////////////////////////////////////

export const commentData: CommentProfile[] = [
  {
    id: "1",
    user: "Anon",
    profilePicture: require("../assets/user_images/user1.jpg"),
    text: "I love this cat, she is so cute *__*",
  },

  {
    id: "2",
    user: "Shelly",
    profilePicture: require("../assets/user_images/user2.jpg"),
    text: "OMG she´s so adorable",
  },

  {
    id: "3",
    user: "Merlin",
    profilePicture: require("../assets/user_images/user3.jpg"),
    text: " I can´t hold on :D",
  },

  {
    id: "4",
    user: "Jason",
    profilePicture: require("../assets/user_images/user4.jpg"),
    text: "I´ll adopt you, sweetheart",
  },

  {
    id: "5",
    user: "Pia",
    profilePicture: require("../assets/user_images/user5.jpg"),
    text: "Please send me a cute kitten <3",
  },
];
