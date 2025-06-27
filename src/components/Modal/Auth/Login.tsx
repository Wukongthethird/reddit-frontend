import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

/**
 * Login component for authenticating users using Firebase.
 *
 * Features:
 * - Form for email and password login
 * - Uses Recoil for modal state management
 * - Shows Firebase auth errors if login fails
 * - Links to "Reset Password" and "Sign Up"
 */
const Login: React.FC = () => {
  // Hook to update Recoil atom state for auth modal view (login, signup, reset)
  const setAuthModalState = useSetRecoilState(authModalState);
  // Local state for login form fields
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Firebase auth hook to sign in with email and password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  /**
   * Handles form submission
   * Calls Firebase sign-in function with email and password
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  //Handles changes to input fields and updates local state
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update form state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Email Input Field */}
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {/* Password Input Field */}
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {/* Display Firebase Error if any */}

      <Text textAlign={"center"} color="red" fontSize={"10pt"}>
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Log in
      </Button>
      {/* Link to Reset Password */}

      <Flex fontSize="9pt" justifyContent={"center"}>
        <Text mr={1}>Forgot Password?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "resetPassword" }))
          }
        >
          Reset Password
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent={"center"}>
        <Text mr={1}>new here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
