import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Input,
  Checkbox,
  Stack,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

//Interacts with firebase
const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  // form  input state
  const [communityName, setCommunityName] = useState("");
  // messae input
  const [charsRemainding, setCharsRemainding] = useState(21);

  // check box input
  const [communityType, setCommunityType] = useState("public");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) {
      return;
    }
    setCommunityName(event.target.value);
    setCharsRemainding(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection={"column"}
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDir={"column"} padding={"10px 8px"}>
              <Text fontWeight={600} fontSize={15}>
                NAME
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names includinfg cannot have caps
              </Text>
              <Text
                pos="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                /r
              </Text>
              <Input
                pos="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                color={charsRemainding === 0 ? "red" : "gray.500"}
                fontSize="9pt"
              >
                {charsRemainding} Characters remainding
              </Text>
              <Box mt={4} mb={4}>
                <Text>Community Type</Text>
                {/* {<checkbox/>} */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Text fontSize={"10pt"} mr={1}>
                        Public
                      </Text>
                      <Text fontSize={"8pt"} color="gray.500" pt={1}>
                        Anyone can view,post and comment in this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restrict"
                    isChecked={communityType === "restrict"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Text fontSize={"10pt"} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={"8pt"} color="gray.500" pt={1}>
                        Anyone can view this community but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Text fontSize={"10pt"} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"} color="gray.500" pt={1}>
                        Only approved users can view and submit in this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
