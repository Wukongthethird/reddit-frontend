import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Icons from "./Icons";

type RightContextProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContextProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? (
          // <Button onClick={() => signOut(auth)}>Logout</Button>
          <Icons />
        ) : (
          <AuthButtons />
        )}
        {/* {<Menu/>} */}
      </Flex>
    </>
  );
};
export default RightContent;
