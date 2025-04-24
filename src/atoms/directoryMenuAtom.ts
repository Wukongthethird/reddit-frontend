import { atom } from "recoil";
import { IconType } from "react-icons";
import { TiHome } from "react-icons/ti";

/**
 * Represents a single item in the directory (dropdown) menu.
 *
 * - `displayText`: The label shown to the user.
 * - `link`: The route path the item navigates to.
 * - `icon`: The icon displayed next to the label (React icon component).
 * - `iconColor`: The color applied to the icon.
 * - `imageURL`: Optional image used instead of an icon (e.g., a community avatar).
 */
export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

/**
 * Represents the state of the directory menu.
 *
 * - `isOpen`: Indicates whether the menu is currently expanded/open.
 * - `selectedMenuItem`: The currently selected item in the menu.
 */
interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom({
  key: "directoryMenuState",
  default: defaultMenuState,
});
