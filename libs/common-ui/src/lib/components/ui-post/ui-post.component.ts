import {
	Component,
	EventEmitter,
	inject,
	input,
	Output,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { DateConverterPipe } from '@tt/shared';
import { PostComment, Post, EmitPostData, PostHttpService } from '@tt/data-access';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiCommentComponent } from '../ui-comment/ui-comment.component';

@Component({
	selector: 'ui-post',
	imports: [
		UiAvatarComponent,
		CommonModule,
		UiSvgComponent,
		UiPostInputComponent,
		UiCommentComponent,
		DateConverterPipe,
	],
	templateUrl: './ui-post.component.html',
	styleUrl: './ui-post.component.scss',
})
export class UiPostComponent {
	@Output() create = new EventEmitter();

	post = input<Post>();
	comments = input<PostComment[]>();

	postService = inject(PostHttpService);

	async onCreated(data: EmitPostData) {
		this.create.emit(data);
	}
}
