import useDirectory from "@/hooks/useDirectory";
import { Flex, MenuItem, Image, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconBase, IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width={"100%"}
      fontSize={"10pt"}
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            alt="reddit"
            src={imageURL}
            borderRadius="full"
            boxSize="18px"
            mr={2}
          />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
