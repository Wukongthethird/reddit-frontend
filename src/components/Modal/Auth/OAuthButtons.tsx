import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    //creats an object or doc
    const userDocRef = doc(firestore, "users", user.uid);
    // sets the data
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);
  console.log(error, "login error");
  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        <Image
          src="/images/googlelogo.png"
          height="20px"
          mr={4}
          alt="pretend there is an image here"
        />
        Continue with Google
      </Button>

      {error && (
        <Text>
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
