import { inject, Injectable } from '@angular/core';
import { Post, PostCreateDto } from '../interfaces/post.interface';
import { HttpService } from './http.service';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root',
})
export class PostHttpService extends HttpService {
	private direction: string = `${this.baseApiUrl}post/`;

	createPost(payload: PostCreateDto) {
		return this.http.post<Post>(`${this.direction}`, payload);
	}

	fetchPost(id: string | number) {
		if(id && id !== 'me') {
			return this.http.get<Post[]>(`${this.direction}${id}`)
		}
			return this.http.get<Post[]>(`${this.direction}`)

	}
}
