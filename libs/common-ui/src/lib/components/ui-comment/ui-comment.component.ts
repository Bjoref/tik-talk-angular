import { Component, input } from '@angular/core';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { CommonModule } from '@angular/common';
import { DateConverterPipe } from '@tt/shared';
import {  PostComment } from '@tt/data-access';

@Component({
	selector: 'ui-comment',
	imports: [UiAvatarComponent, CommonModule, DateConverterPipe],
	templateUrl: './ui-comment.component.html',
	styleUrl: './ui-comment.component.scss',
})
export class UiCommentComponent {
	comment = input<PostComment>();
}
