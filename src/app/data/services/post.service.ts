import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { CommentHttpService } from './comment-http.service';
import { Observable, of } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { PostHttpService } from './post-http.service';
import { Post, PostComment } from '../interfaces/post.interface';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	constructor(
		private commentService: CommentHttpService,
		private postHttpService: PostHttpService
	) {}
	public updateHeight(hostElement: ElementRef, renderer: Renderer2) {
		const { top } = hostElement.nativeElement.getBoundingClientRect();
		const height = window.innerHeight - top - 24 - 24;

		renderer.setStyle(hostElement.nativeElement, 'height', height + 'px');
	}

	public onCreatePost(
		postText: string | null,
		isCommentInput: boolean,
		profile: Profile,
		postId: number
	): Observable<Post[] | PostComment | null> {
		if (!postText) {
			return of(null); // Возвращаем Observable с null
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
