import { Component, inject, input, signal } from '@angular/core';
import { PostComment, Post } from '../../data/interfaces/post.interface';
import { UiAvatarComponent } from "../ui-avatar/ui-avatar.component";
import { CommonModule } from '@angular/common';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiCommentComponent } from '../ui-comment/ui-comment.component';
import { PostHttpService } from '../../data/services/post-http.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'ui-post',
  imports: [UiAvatarComponent, CommonModule, UiSvgComponent, UiPostInputComponent, UiCommentComponent],
  templateUrl: './ui-post.component.html',
  styleUrl: './ui-post.component.scss'
})
export class UiPostComponent {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostHttpService);
  
  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id))

    console.log(this.comments)

    this.comments.set(comments)

    console.log(this.comments)
  }


}
