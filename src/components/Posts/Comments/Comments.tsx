import { Post, postState } from "@/atoms/postsAtom";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { create } from "domain";
import { firestore } from "@/firebase/clientApp";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";

type CommentsProps = {
  user: User;
  selectPost: Post | null;
  communityId: string;
};

/**
 * Displays the comments section under a post.
 * Handles fetching, creating, and deleting comments using Firestore.
 */
const Comments: React.FC<CommentsProps> = ({
  user,
  selectPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const setPostState = useSetRecoilState(postState);

  /**
   * Handles creating a new comment.
   * - Writes comment to Firestore.
   * - Updates post's comment count.
   * - Updates client-side state.
   */
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

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      //update numberOfComments
      const postDocRef = doc(firestore, "posts", selectPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      //update client recoil state
      // Update UI state

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

  /**
   * Handles deleting a comment.
   * - Removes comment from Firestore.
   * - Decrements post comment count.
   * - Updates local state.
   *
   * @param {Comment} comment - The comment to be deleted
   */
  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);
    try {
      // delete comment document
      //update numberOfComments
      //update client recoil state
      const batch = writeBatch(firestore);

      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      const postDocRef = doc(firestore, "posts", selectPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });
      await batch.commit();
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComment error", error);
    }
    setLoadingDeleteId("");
  };

  /**
   * Fetches all comments for the selected post from Firestore.
   */
  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectPost?.id!),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);

      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostComments", error);
    }
    setFetchLoading(false);
  };

  // Fetch comments when a new post is selected

  useEffect(() => {
    if (!selectPost) {
      return;
    }
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPost]);
  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex direction="column" pl={10} pr={6} fontSize={"10pt"} width={"100%"}>
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>

      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding={6} bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt={4} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                borderTop={"1px solid"}
                p={20}
                borderColor={"gray.100"}
              >
                <Text fontWeight={700} opacity={0.3}>
                  {`Ain't no chickens clucking yet.`}
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
