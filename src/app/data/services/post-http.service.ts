import { Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { PostComment, Post, PostCreateDto } from '../interfaces/post.interface';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PostHttpService extends HttpService {
	private direction: string = 'post/';

	posts = signal<Post[]>([]);

	createPost(payload: PostCreateDto) {
		return this.http
			.post<Post>(`${this.baseApiUrl}${this.direction}`, payload)
			.pipe(
				switchMap(() => {
					return this.fetchPost();
				})
			);
	}

	fetchPost() {
		return this.http
			.get<Post[]>(`${this.baseApiUrl}${this.direction}`)
			.pipe(tap((res) => this.posts.set(res)));
	}

	getCommentByPostId(postId: number):Observable<PostComment[]> {
		return this.http
      .get<{ comments: PostComment[] }>(`${this.baseApiUrl}${this.direction}${postId}`)
      .pipe(
        map((response) => response.comments)
      );
	}
}
