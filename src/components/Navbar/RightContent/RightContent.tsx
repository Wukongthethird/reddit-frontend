import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";

type RightContextProps = {};

const RightContent: React.FC<RightContextProps> = () => {
  return (
    <>
      {/* <AuthModal/> */}
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
