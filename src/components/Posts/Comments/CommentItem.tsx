import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId?: string | null;
};
/**
 *  Renders a single comment item, including text, metadata,
 * voting icons, and edit/delete actions.
 */
const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box>
        <Icon fontSize={30} color="gray.300" as={FaReddit} />
      </Box>
      {/* Comment content area */}

      <Stack spacing={1}>
        {/* Header: Username, timestamp, and spinner if deleting */}

        <Stack direction={"row"} align="center" fontSize="8pt">
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color={"gray.500"}>
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        {/* Action icons: Upvote/Downvote and Edit/Delete if user is the creator */}

        <Stack
          direction={"row"}
          align="center"
          cursor={"pointer"}
          color="gray.500"
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize={"9pt"} _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize={"9pt"}
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
