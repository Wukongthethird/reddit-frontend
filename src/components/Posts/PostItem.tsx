import { Post } from "@/atoms/postsAtom";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

/**
 * PostItem Component
 *
 * a single post in a Reddit-like application.
 * It displays post details, allows voting, deletion, and navigation to a single post view.
 *
 * Props:
 * - post: The Post object containing all relevant post data.
 * - userIsCreator: Boolean indicating if the current user is the post's creator.
 * - userVoteValue: The current user's vote on this post (1, -1, or undefined).
 * - onVote: Function to handle vote actions (upvote/downvote).
 * - onDeletePost: Function to handle deleting the post.
 * - onSelectPost: Optional function triggered when the post is clicked (used in feed view).
 * - homePage: Boolean indicating if the component is rendered on the homepage (for community icon rendering).
 */

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
  homePage,
}) => {
  // state before the image load since we would have a post box item on screen
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostPage = !onSelectPost;
  const router = useRouter();
  const [error, setError] = useState("");
  // const { communityId } = router.query;

  /**
   * Handles deletion of the post.
   * Prevents propagation, sets loading state, and navigates on success.
   */
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete Post");
      }
      console.log("Post was Endod");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  console.log("posTITEM", homePage);

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : 4}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      {/* Voting Column */}

      <Flex
        direction={"column"}
        align={"center"}
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width={"40px"}
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor={"pointer"}
        />
        <Text fontSize={"9pt"}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor={"pointer"}
        />
      </Flex>
      {/* Post Content */}

      <Flex direction={"column"} width={"100%"}>
        {/* Error Alert */}

        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}> Error Creating Post</Text>
          </Alert>
        )}
        {/* Post Header */}

        <Stack spacing={1} p="10px">
          <Stack
            direction={"row"}
            spacing={0.6}
            align={"center"}
            fontSize={"9pt"}
          >
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius={"full"}
                    boxSize={"18px"}
                    mr={2}
                    alt="meaningful text"
                  />
                ) : (
                  <Icon
                    as={FaReddit}
                    fontSize={"18pt"}
                    mr={1}
                    color="blue.500"
                  />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize={8} />
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          {/* Post Title and Body */}

          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          {singlePostPage && <Text fontSize={"12pt"}>{post.body}</Text>}
          {/* Post Image */}

          {post.imageURL && (
            <Flex justify={"center"} align={"center"} p={2}>
              {loadingImage && (
                <Skeleton height={"200px"} width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt="Post Image"
                maxH={"460px"}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        {/* Post Footer (Actions) */}

        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}> {post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={"9pt"}>Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={"9pt"}>save</Text>
          </Flex>
          {/* Delete (Only for Creator) */}
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={"9pt"}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
