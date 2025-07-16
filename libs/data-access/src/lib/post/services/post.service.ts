import { Injectable } from '@angular/core';
import { CommentHttpService } from './comment-http.service';
import { Observable, of } from 'rxjs';
import { PostHttpService } from './post-http.service';
import { Post, PostComment } from '../interfaces/post.interface';
import { Profile } from '../../profile';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	constructor(
		private commentService: CommentHttpService,
		private postHttpService: PostHttpService
	) {}
	
	public onCreatePost(
		postText: string | null,
		isCommentInput: boolean,
		profile: Profile,
		postId: number
	): Observable<Post | PostComment | null> {
		if (!postText) {
			return of(null);
		}

		if (isCommentInput) {
			return this.commentService.createComment({
				text: postText,
				authorId: profile.id,
				postId: postId,
			});
		}

		return this.postHttpService.createPost({
			title: 'Клёвый пост',
			content: postText,
			authorId: profile.id,
		});
	}
}
