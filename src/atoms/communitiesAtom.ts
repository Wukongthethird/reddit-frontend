import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

/**
 * Global Recoil atom to manage the state of the user's communities.
 *
 * This atom holds the user's list of communities,
 * including the communities they have joined, their moderation status, and
 * the selected community they are viewing.
 *
 * @key "communitiesState"
 *
 * @default
 * {
 *   mySnippets: [],         // User's list of community relationships
 *   snippetsFetch: false,   // Indicates if snippets have been fetched (used for login status too)
 * }
 *
 * @type {CommunityState}
 *
 * Structure:
 * - `mySnippets`: Array of community snippets representing the user's relationship to each community.
 * - `currentCommunity`: The currently active/selected community (if any).
 * - `snippetsFetch`: Boolean flag indicating whether the user's snippets have been fetched.
 */
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

/**
 * Maintains the list of communities the user is a member of or follows.
 * Each snippet contains metadata about the user's relationship to a community.
 *
 * Example:
 * [
 *   {
 *     communityId: "reactjs",
 *     isModerator: true,
 *     imageURL: "https://..."
 *   },
 *   ...
 * ]
 */
export interface CommunitySnippets {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
/**
 * Represents the user's community state.
 *
 * - `mySnippets`: List of communities the user has joined or follows.
 * - `currentCommunity`: The currently selected or active community.
 * - `snippetsFetch`: Indicates whether the user's community snippets have been fetched.
 *   Also used to determine if the user is logged in (if false and no snippets).
 */
interface CommunityState {
  mySnippets: CommunitySnippets[];
  currentCommunity?: Community;
  snippetsFetch: boolean;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetsFetch: false,
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
