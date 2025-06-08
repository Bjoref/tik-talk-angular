import { Component, input } from '@angular/core';
import { PostComment } from '../../data/interfaces/post.interface';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { CommonModule } from '@angular/common';
import { DateConverterPipe } from '../../helpers/pipes/date-converter.pipe';

@Component({
	selector: 'ui-comment',
	imports: [UiAvatarComponent, CommonModule, DateConverterPipe],
	templateUrl: './ui-comment.component.html',
	styleUrl: './ui-comment.component.scss',
})
export class UiCommentComponent {
	comment = input<PostComment>();
}
