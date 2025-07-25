import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { Post, PostVote, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const router = useRouter();
  const currentCommunity = useRecoilValue(communityState).currentCommunity;
  const setAuthModalState = useSetRecoilState(authModalState);

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const { voteStatus } = post;

      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );
      // copy of current post
      let updatedPost = { ...post };
      // copy of curernt post in state
      let updatedPosts = [...postStateValue.posts];
      // copy of all upvotes in state
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      const batch = writeBatch(firestore);
      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, `users`, `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote, // 1 || -1
        };

        batch.set(postVoteRef, newVote);
        //update recoil atom to match back end
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        //removing vote
        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          batch.delete(postVoteRef);
          voteChange *= -1;
        }
        //flips vote
        else {
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          updatedPostVotes[voteIdx] = {
            ...existingVote,
            voteValue: vote,
          };

          batch.update(postVoteRef, {
            voteValue: vote,
          });
          voteChange = 2 * vote;
        }
      }
      //update state with updated states
      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      updatedPosts[postIdx] = updatedPost;

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      //update our post doc
      const postRef = doc(firestore, "posts", post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();
    } catch (error) {
      console.log("onVote error", error);
    }
  };

  // grabs the comments of the post
  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    // if (!user?.uid) {
    //   return false;
    // }
    try {
      if (post.imageURL) {
        //delete image ref
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      //delete post
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      //update recoil State
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      //check if image delete fire storage
      // delete post doc from firestore
      //update recoil store
      return true;
    } catch (error: any) {
      console.log("onDelete post errpr");
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      // finds all user postvotes in the community
      collection(firestore, `users`, `${user?.uid}/postVotes`),
      where(`communityId`, "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    // checks
    console.log("poststate", postVoteDocs);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  useEffect(() => {
    if (!user || !currentCommunity) {
      return;
    }
    getCommunityPostVotes(currentCommunity?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommunity, user]);

  useEffect(() => {
    if (!user) {
      // clear votes on logout
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
