import { Component, input } from '@angular/core';
import { UiAvatarComponent } from '@tt/common-ui';
import { LastMessageRes } from '../../data';
import { DateConverterPipe } from '@tt/shared';

@Component({
	selector: 'button[chats]',
	imports: [UiAvatarComponent, DateConverterPipe],
	templateUrl: './ui-chats-button.component.html',
	styleUrl: './ui-chats-button.component.scss',
})
export class UiChatsButtonComponent {
	chat = input<LastMessageRes>();
}
