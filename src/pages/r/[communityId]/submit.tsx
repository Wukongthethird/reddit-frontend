import { communityState } from "@/atoms/communitiesAtom";
import About from "@/components/Community/About";
import NewPostForm from "@/components/Posts/NewPostForm";
import PageContent from "@/components/layout/PageContent";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  console.log("community", communityStateValue.currentCommunity);
  return (
    <PageContent>
      <>
        <Box
          padding={"14px 0px"}
          borderBottom={"1px solid"}
          borderColor={"white"}
        >
          <Text>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>

      <></>
      {communityStateValue.currentCommunity && (
        <About communityData={communityStateValue.currentCommunity} />
      )}
    </PageContent>
  );
};
export default SubmitPostPage;
