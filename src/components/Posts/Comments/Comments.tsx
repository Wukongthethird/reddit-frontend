import { Post, postState } from "@/atoms/postsAtom";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { create } from "domain";
import { firestore } from "@/firebase/clientApp";
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";

type CommentsProps = {
  user: User;
  selectPost: Post | null;
  communityId: string;
};

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      // create comment document
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectPost?.id!,
        postTitle: selectPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);
      //update numberOfComments
      const postDocRef = doc(firestore, "posts", selectPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      //update client recoil state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("comment error", error);
    }

    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: any) => {
    // delete comment document
    //update numberOfComments
    //update client recoil state
  };

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);
  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex direction="column" pl={10} pr={6} fontSize={"10pt"} width={"100%"}>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};
export default Comments;
