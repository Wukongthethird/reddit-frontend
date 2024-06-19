import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Flex,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { auth } from "../../../firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";
import { communityState } from "@/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

// dropdown on far right side
const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
    //clear communityState
    resetCommunityState();
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color="gray.200"
                />
                <Flex
                  direction={"column"}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={"8pt"}
                  align={"flex-start"}
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>

                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.200" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            {" "}
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} />
                Log out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              // sets modal to pop up
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} />
                Login /Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
