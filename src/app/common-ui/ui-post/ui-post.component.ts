import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { PostComment, Post, EmitPostData } from '../../data/interfaces/post.interface';
import { UiAvatarComponent } from "../ui-avatar/ui-avatar.component";
import { CommonModule } from '@angular/common';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiCommentComponent } from '../ui-comment/ui-comment.component';
import { PostHttpService } from '../../data/services/post-http.service';
import { firstValueFrom } from 'rxjs';
import { DateConverterPipe } from '../../helpers/pipes/date-converter.pipe';

@Component({
  selector: 'ui-post',
  imports: [UiAvatarComponent, CommonModule, UiSvgComponent, UiPostInputComponent, UiCommentComponent, DateConverterPipe],
  templateUrl: './ui-post.component.html',
  styleUrl: './ui-post.component.scss'
})
export class UiPostComponent {
	@Output() create = new EventEmitter();

  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostHttpService);
  
  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(data: EmitPostData) {
		this.create.emit(data);
    
    const comments = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id))

    this.comments.set(comments);

  }


}
