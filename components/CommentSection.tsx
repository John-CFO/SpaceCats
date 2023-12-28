//////////////////////////comment section///////////////////////////////////////

import { View, Text, Image, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

import CommentForm from "./CommentForm";
import { CommentProfile } from "./Users";
import { whiteHeart, redHeart } from "../assets";

////////////////////////////////////////////////////////////////////////////////

export interface Comment {
  id: number;
  user: string;
  profilePicture: ImageSourcePropType;
  text: string;
  likes: number;
}

interface CommentSectionProps {
  comments: Comment[];
  onLike?: (commentId: number) => void;
  commentId: number;
}

///////////////////////////////////////////////////////////////////////////////

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onLike,
  commentId,
}) => {
  //comments state implementation
  const [commentData, setCommentData] = useState<Comment[]>(comments);

  //like state implementation
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );

  //const commentSectionRef = useRef<CommentSectionProps>(null);

  const addComment = (newCommentText: string, parentCommentId: number) => {
    const parentComment = commentData.find(
      (comment) => comment.id === parentCommentId
    );

    //const [replyUsername, setReplyUsername] = useState("");

    const newComment: Comment = {
      id: commentData.length + 1,
      user: "Anon",
      profilePicture: require("../assets/user_images/user1.jpg"),
      text: newCommentText,
      likes: 0,
    };
    setCommentData([...commentData, newComment]); //initialized a new comment state with the new comment
    const updatedComments = [...commentData, newComment];

    setCommentData(updatedComments);
  };

  const handleLikes = (commentId: number) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }));
    onLike && onLike(commentId);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <CommentForm
          onAddComment={(text, commentId) => addComment(text, commentId)}
          initialText={`@Anon`}
          commentId={commentId}
        />
      </View>
      <ScrollView style={{ marginTop: 3 }}>
        {commentData.map((comment) => (
          <View
            key={comment.id}
            style={{
              borderWidth: 5,
              borderColor: "#191919",
              height: 100,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={comment.profilePicture}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                {comment.user}
              </Text>
            </View>
            <View
              style={{
                width: 280,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "lightgray",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                {comment.text}
              </Text>
            </View>
            <View
              style={{
                width: 50,
                height: 80,
                flexDirection: "column",

                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => handleLikes(comment.id)}>
                <Image
                  source={likedComments[comment.id] ? redHeart : whiteHeart} //jsx to change from white to red heart
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CommentSection;
