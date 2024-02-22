////////////////////////////////comment form/////////////////////////////////////////////

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

//////////////////////////////////////////////////////////////////////////////////////////

//typography for the CommentFormProps
interface CommentFormProps {
  onAddComment: (newCommentText: string, commentId: number) => void;
  initialText: string;
  commentId: number;
}

//////////////////////////////////////////////////////////////////////////////////////////

const CommentForm: React.FC<CommentFormProps> = ({
  //comment props
  onAddComment,
  initialText,
  commentId,
}) => {
  const [newComment, setNewComment] = useState(""); //the emty string is the initial comment state

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

      inputRef.current?.blur(); //if you want to close the keyboard after submit set blur
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

    //setInterval condition
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
    }, 700); //handle animation time

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {/*--modal header--*/}

      <Text
        style={{
          color: "pink",
          fontFamily: "MontserratAlternatesBold",
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
          keyboardAppearance="dark"
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
        <TouchableOpacity
          /* unknown ignored the type expectation and GestureResponseEvens => void set the type clearly */
          onPress={
            handleCommentSubmit as unknown as (
              event: GestureResponderEvent
            ) => void
          }
        >
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
                fontFamily: "MontserratAlternatesBold",
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
