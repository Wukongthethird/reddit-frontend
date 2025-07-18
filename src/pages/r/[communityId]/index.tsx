import { Community, communityState } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { Box } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";

type CommunityPageProps = {
  communityData: Community;
};

/**
 * CommunityPage.tsx
 *
 * Displays a community page including its header, posts, and sidebar details.
 * Uses SSR to pre-fetch community data from Firestore.
 * Renders the community page if the community exists.
 * Sets the currentCommunity in Recoil state when component mounts.
 */
const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    // Store current community data in global Recoil state

    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData]);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};
/**
 * getServerSideProps
 *
 * Fetches the community data on each request (SSR).
 * This ensures the community exists and provides its data to the page.
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community dayta pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
    // could do error page
    return { notFound: true };
  }
}

export default CommunityPage;
