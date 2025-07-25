import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

// dropdown on left side handles list of communities.
const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    // handles visibility of dropdown
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          {/* Display either the selected community's image or icon */}

          {directoryState.selectedMenuItem?.imageURL ? (
            <Image
              alt={directoryState.selectedMenuItem.displayText}
              src={directoryState.selectedMenuItem.imageURL}
              borderRadius={"full"}
              boxSize={"24px"}
              mr={2}
            />
          ) : (
            <Icon
              fontSize={24}
              mr={{ Base: 1, md: 2 }}
              as={directoryState.selectedMenuItem.icon}
              color={directoryState.selectedMenuItem.iconColor}
            />
          )}
          {/* Text label for selected menu item (visible on larger screens) */}

          <Flex align="center">
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt">
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>{<Communities />} </MenuList>
    </Menu>
  );
};
export default Directory;
