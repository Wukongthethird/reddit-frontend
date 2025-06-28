import { communityState } from "@/atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const communityStateValue = useRecoilValue(communityState);
  const router = useRouter();

  // goes tot he community. interacts with directory atom if this is the selected community
  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    // sets selected menut item as the one you clicked on
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  // handles directory toggle
  const toggleMenuOpen = () =>
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));

  // will set the icon in directory automattically prevents render shennanigans
  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      // its the icon showed on directory
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityStateValue.currentCommunity]);
  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
