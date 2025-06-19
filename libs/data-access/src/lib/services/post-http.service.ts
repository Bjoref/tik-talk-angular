import { inject, Injectable, signal } from '@angular/core';
import { PostComment, Post, PostCreateDto } from '../interfaces/post.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Store } from '@ngrx/store';
import { postsActions } from '../store';

@Injectable({
	providedIn: 'root',
})
export class PostHttpService extends HttpService {
	private direction: string = `${this.baseApiUrl}post/`;
	store = inject(Store);

	createPost(payload: PostCreateDto) {
		return this.http.post<Post>(`${this.direction}`, payload);
	}

	fetchPost() {
		return this.http.get<Post[]>(`${this.direction}`)
	}

	getCommentByPostId(postId: number): Observable<PostComment[]> {
		return this.http
			.get<{ comments: PostComment[] }>(`${this.direction}${postId}`)
			.pipe(map((response) => {
				console.log(response)
				return response.comments
			}));
	}
}
