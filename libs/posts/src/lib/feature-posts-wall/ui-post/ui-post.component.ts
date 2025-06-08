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
import {
	PostComment,
	Post,
	EmitPostData,
	PostHttpService
} from '../../data';
import { UiPostInputComponent, UiCommentComponent } from '../../ui';
import { UiAvatarComponent, UiSvgComponent, DateConverterPipe } from '@tt/common-ui';

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

	comments = signal<PostComment[]>([]);

	postService = inject(PostHttpService);

	async ngOnInit() {
		this.comments.set(this.post()!.comments);
	}

	async onCreated(data: EmitPostData) {
		this.create.emit(data);

		const comments = await firstValueFrom(
			this.postService.getCommentByPostId(this.post()!.id)
		);

		this.comments.set(comments);
	}
}
