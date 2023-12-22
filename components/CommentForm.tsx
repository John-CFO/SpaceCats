////////////////////////////////comment form/////////////////////////////////////////////

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

///////////////////////////////////////////////////////////////////////////////////////////////////////

interface CommentFormProps {
  onAddComment: (newCommentText: string) => void;
}
//React.Dispatch<React.SetStateAction<string>>;
const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState(""); //the emty string is the initial comment state

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //prevents that form loads again

    //checks whether the comment is not empty after trimming
    if (newComment.trim() !== "") {
      onAddComment(newComment); //pushed the new comment

      setNewComment(""); //set the state back to emty
    }
  };

  return (
    <View>
      {/*--modal header--*/}
      <Text
        style={{
          color: "pink",
          fontWeight: "bold",
          fontSize: 32,
          borderBottomWidth: 1,
          marginHorizontal: 25,
          borderColor: "pink",
          paddingBottom: 6,
          textAlign: "center",
        }}
      >
        Comments
      </Text>
      {/*--input field--*/}
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: 50,
          backgroundColor: "dimgray",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 5,
        }}
      >
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor={"rgba(211, 211, 211, 0.5)"}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          style={{
            padding: 10,
            backgroundColor: "dimgray",
            color: "lightgray",
            fontSize: 22,
            fontWeight: "bold",
            width: 300,
          }}
        />
        {/*--submit button--*/}
        <TouchableOpacity onPress={handleCommentSubmit as any}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 50,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: "pink",
              backgroundColor: "lightgray",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
                color: "mediumvioletred",
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentForm;
