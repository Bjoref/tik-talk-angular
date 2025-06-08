import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CommentCreateDto, PostComment } from '../interfaces/post.interface';

@Injectable({
	providedIn: 'root',
})
export class CommentHttpService extends HttpService {
	private direction: string = `${this.baseApiUrl}comment/`;

	createComment(payload: CommentCreateDto) {
		return this.http.post<PostComment>(`${this.direction}`, payload);
	}
}
