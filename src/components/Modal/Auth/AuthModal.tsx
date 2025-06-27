import { authModalState } from "@/atoms/authModalAtom";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPassword from "./ResetPassword";

/**
 * AuthModal component
 *
 * This renders a modal for authentication throughout the app.
 * It provides interfaces for Login, Signup, and Reset Password views.
 *
 * ## Features
 * - Renders conditionally based on Recoil state (`authModalState`)
 * - Integrates Firebase Auth (`useAuthState`)
 * - Closes automatically when a user is authenticated
 * - Allows toggling between auth views
 *
 * @component
 */
const AuthModal: React.FC = () => {
  // Recoil state to control modal visibility and current view
  const [modalState, setModalState] = useRecoilState(authModalState);
  // Firebase Auth hook: returns user, loading state, and error
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  useEffect(() => {
    if (user) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
            pb={6}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              width="70%"
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color="gray.500" fontWeight={700}>
                    OR
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <>{<ResetPassword toggleView={toggleView} />}</>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
