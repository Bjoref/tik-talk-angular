import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
	selector: 'ui-avatar',
	imports: [ImgUrlPipe],
	templateUrl: './ui-avatar.component.html',
	styleUrl: './ui-avatar.component.scss',
})
export class UiAvatarComponent {
	@Input() avatarUrl: string | null = null;
}
