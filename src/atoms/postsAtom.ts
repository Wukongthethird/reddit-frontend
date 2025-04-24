import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

/**
 * Global Recoil atom to manage post-related state across the application.
 *
 * This atom loads the "feed" of the user
 *
 * @key "postState"
 *
 * @default
 * {
 *   selectedPost: null,   // No post selected by default
 *   posts: [],            // Empty post list until loaded
 *   postVotes: [],        // User's votes on posts, fetched per community or session
 * }
 *
 * @type {PostState}
 *
 * Structure:
 * - `selectedPost`: The post currently being viewed or interacted with.
 * - `posts`: The list of posts fetched for the active community or feed.
 * - `postVotes`: Array of vote records (upvotes/downvotes) from the current user.
 */

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

// used for single page view of a post
// decides if we are viewing a post or a feed from home or community
interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
