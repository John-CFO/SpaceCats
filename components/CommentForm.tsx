////////////////////////////////comment form/////////////////////////////////////////////

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";

//////////////////////////////////////////////////////////////////////////////////////////

//typography for the CommentFormProps
interface CommentFormProps {
  onAddComment: (newCommentText: string, commentId: number) => void;
  initialText: string;
  commentId: number;
  replyUsername: string;
}

//////////////////////////////////////////////////////////////////////////////////////////

const CommentForm: React.FC<CommentFormProps> = ({
  onAddComment,
  initialText,
  commentId,
  replyUsername,
}) => {
  const [newComment, setNewComment] = useState(replyUsername || ""); //the emty string is the initial comment state

  const handleCommentSubmit = (e: React.FormEvent) => {
    /*--input function to set a comment--*/
    e.preventDefault(); //prevents that form loads again

    //checks whether the comment is not empty after trimming
    if (newComment.trim() !== "") {
      console.log(
        "Calling onAddComment with newComment:",
        newComment,
        "commentId:",
        commentId
      );
      onAddComment(newComment, commentId); //pushed the new comment
      setNewComment(""); //set the state back to emty

      inputRef.current?.focus();
    } else {
      console.log("Comment is empty or just contains spaces. Not submitting.");
    }
  };

  const inputRef = useRef<TextInput>(null);

  /*--placeholder animation--*/

  const [dots, setDots] = useState(".");

  useEffect(() => {
    //initial count
    let count = 0;

    //setInterval function
    const interval = setInterval(() => {
      if (count === 0) {
        setDots(".");
      } else if (count === 1) {
        setDots("..");
      } else if (count === 2) {
        setDots("...");
      } else {
        setDots("");
        count = -1; //restart the animation
      }

      count += 1;
    }, 800); //handle animation time

    return () => clearInterval(interval);
  }, []);

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
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 5,
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder={`Add a comment${dots}`}
          placeholderTextColor={"rgba(211, 211, 211, 0.5)"}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          style={{
            padding: 10,
            backgroundColor: "#191919",
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
