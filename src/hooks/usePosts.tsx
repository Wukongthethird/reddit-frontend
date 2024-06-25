import { Post, postState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        //delete image ref
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      //delete post
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      //update recoil State
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      //check if image delete fire storage
      // delete post doc from firestore
      //update recoil store
    } catch (error: any) {
      console.log("onDelete post errpr");
      return false;
    }
    return true;
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
