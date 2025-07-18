import { Injectable } from '@angular/core';
import { CommentCreateDto, PostComment } from '../interfaces/post.interface';
import { HttpService } from '../../common';

@Injectable({
	providedIn: 'root',
})
export class CommentHttpService extends HttpService {
	private direction: string = `${this.baseApiUrl}comment/`;

	createComment(payload: CommentCreateDto) {
		return this.http.post<PostComment>(`${this.direction}`, payload);
	}
}
