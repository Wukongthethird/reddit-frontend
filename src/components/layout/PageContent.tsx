import React from "react";
import { Flex } from "@chakra-ui/react";

type PageContentProps = {};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("children", children);
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify={"center"} maxWidth={"860px"}>
        {/*left*/}
        <Flex direction={"column"} width={{ base: "100%", md: "65%" }}>
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/*right*/}
        <Flex
          direction={"column"}
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
