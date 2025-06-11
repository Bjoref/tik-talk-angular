import {
	Component,
	EventEmitter,
	HostBinding,
	inject,
	input,
	Output,
	Renderer2,
} from '@angular/core';
import { UiAvatarComponent, UiSvgComponent } from '@tt/common-ui';
import { ProfileHttpService, PostHttpService, CommentHttpService, PostService, EmitPostData } from '@tt/shared';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
	selector: 'ui-post-input',
	imports: [UiAvatarComponent, UiSvgComponent, FormsModule],
	templateUrl: './ui-post-input.component.html',
	styleUrl: './ui-post-input.component.scss',
})
export class UiPostInputComponent {
	private destroy$ = new Subject<void>();

	isCommentInput = input<boolean>(false);
	isMessageInput = input<boolean>(false);
	postId = input<number>(0);

	postService = inject(PostService);
	postHttpService = inject(PostHttpService);
	commentService = inject(CommentHttpService);
	r2 = inject(Renderer2);
	profile = inject(ProfileHttpService).me;

	postText: string = '';

	@HostBinding('class.comment')
	get isComment() {
		return this.isCommentInput();
	}

	@Output() create = new EventEmitter();
	@Output() createMessage = new EventEmitter<string>();

	onTextAreaInput(event: Event) {
		const textarea = event.target as HTMLTextAreaElement;

		this.r2.setStyle(textarea, 'height', 'auto');
		this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
	}

	onCreatePost() {
		if (!this.isMessageInput) {
			const data: EmitPostData = {
				postText: this.postText,
				isCommentInput: this.isCommentInput(),
				profile: this.profile()!,
				postId: this.postId(),
			};

			
			this.create.emit(data);
		} else {
			this.createMessage.emit(this.postText);
		}

		this.postText = '';
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
