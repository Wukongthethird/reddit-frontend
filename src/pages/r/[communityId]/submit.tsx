import NewPostForm from "@/components/Posts/NewPostForm";
import PageContent from "@/components/layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const submit: React.FC = () => {
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
        <NewPostForm />
      </>

      <></>
      {/* <>{About}</> */}
    </PageContent>
  );
};
export default submit;
