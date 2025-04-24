import { atom } from "recoil";

/**
 * Global Recoil atom to manage the state of the authentication modal.
 *
 * @type {AuthModalState}
 * @property {boolean} open - Whether the modal is visible or not.
 * @property {"login" | "signup" | "resetPassword"} view - Current view being shown in the modal.
 *
 */

export interface AuthModalState {
  open: boolean;
  view: ModalView;
}

export type ModalView = "login" | "signup" | "resetPassword";

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState", // unique key for this atom
  default: defaultModalState,
});
