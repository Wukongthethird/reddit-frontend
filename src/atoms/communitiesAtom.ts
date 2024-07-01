import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// basis of comunity
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

// subcommunity
export interface CommunitySnippets {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

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
