import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '../../helpers';

@Component({
	selector: 'ui-avatar',
	imports: [ImgUrlPipe],
	templateUrl: './ui-avatar.component.html',
	styleUrl: './ui-avatar.component.scss',
})
export class UiAvatarComponent {
	@Input() avatarUrl: string | null = null;
}
