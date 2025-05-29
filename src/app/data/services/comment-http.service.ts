import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CommentCreateDto, Post, PostComment } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService extends HttpService {
	private direction: string = 'comment/';


    createComment(payload: CommentCreateDto) {
      return this.http
        .post<PostComment>(`${this.baseApiUrl}${this.direction}`, payload)
    }
  
    fetchComment() {
      // return this.http
      //   .get<Post[]>(`${this.baseApiUrl}${this.direction}`)
      //   .pipe(tap((res) => this.posts.set(res)));
    }
}
