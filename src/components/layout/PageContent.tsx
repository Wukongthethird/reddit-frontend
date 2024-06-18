import React from "react";
import { Flex } from "@chakra-ui/react";

type PageContentProps = {};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("children", children);
  return (
    <Flex>
      <Flex>
        {/*left*/}
        <Flex>{children && children[0 as keyof typeof children]}</Flex>
        {/*right*/}
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
