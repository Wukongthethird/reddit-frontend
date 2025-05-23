import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

//most of these inout comes  useSelectedFile hook. it handles the client side of checking and selecting file from local machine
const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction={"column"} justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxW="400px"
            maxH="400px"
            alt="meaningful text"
          />
          <Stack direction="row" mt={4}>
            <Button height={"28px"} onClick={() => setSelectedTab("Post")}>
              Back To Post
            </Button>
            <Button
              variant={"outline"}
              height={"28px"}
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify={"center"}
          align="center"
          p={20}
          border="1px dashed"
          borderColor={"gray.200"}
          width="100%"
          borderRadius={4}
        >
          <Button
            variant={"outline"}
            height={"28px"}
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
