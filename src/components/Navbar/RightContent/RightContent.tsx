import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type RightContextProps = {};

const RightContent: React.FC<RightContextProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
