import { Profile } from "../../profile";

export interface PostCreateDto {
	title: string;
	content: string;
	authorId: number;
}

export interface Post {
	id: number;
	title: string;
	communityId: number;
	content: string;
	author: Profile;
	images: string[];
	createdAt: string;
	updatedAt: string;
	likes: number;
	comments: PostComment[];
}

export interface CommentAuthor {
	id: number;
	username: string;
	avatarUrl: string;
	subscribersAmount: number;
}

export interface PostComment {
	id: number;
	text: string;
	author: CommentAuthor;
	postId: number;
	commentId: number;
	createdAt: string;
	updatedAt: string;
	comments: PostComment[];
}

export interface CommentCreateDto {
	text: string;
	authorId: number;
	postId: number;
}

export interface EmitPostData {
	postText: string;
	isCommentInput: boolean;
	profile: Profile;
	postId: number;
}
