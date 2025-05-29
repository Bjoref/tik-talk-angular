import { Component, EventEmitter, HostBinding, inject, input, Output, Renderer2 } from '@angular/core';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { PostHttpService } from '../../data/services/post-http.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommentHttpService } from '../../data/services/comment-http.service';

@Component({
	selector: 'ui-post-input',
	imports: [UiAvatarComponent, UiSvgComponent, FormsModule ],
	templateUrl: './ui-post-input.component.html',
	styleUrl: './ui-post-input.component.scss',
})
export class UiPostInputComponent {
  isCommentInput = input<boolean>(false);
  postId = input<number>(0);

  postService = inject(PostHttpService);
  commentService = inject(CommentHttpService);
	r2 = inject(Renderer2);
	profile = inject(ProfileHttpService).me;

  postText:string = ''

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  @Output() created = new EventEmitter();

	onTextAreaInput(event: Event) {
		const textarea = event.target as HTMLTextAreaElement;

		this.r2.setStyle(textarea, 'height', 'auto');
		this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
	}

  onCreatePost() {
    if(!this.postText) return

    if(this.isCommentInput()) {
      firstValueFrom(this.commentService.createComment({
        text: this.postText,
        authorId: this.profile()!.id,
        postId: this.postId()
      })).then(() => {
        this.postText = '';
        this.created.emit();
      })
      return;
    }

    firstValueFrom(this.postService.createPost( {
      title: 'Клёвый пост',
      content: this.postText,
      authorId: this.profile()!.id
    }))
      .then(() => {
        this.postText = '';
      })
  }
}
