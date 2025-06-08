import { Component, input } from '@angular/core';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { Chat, LastMessageRes } from '../../data/interfaces/chat.interface';
import { DateConverterPipe } from '../../helpers/pipes/date-converter.pipe';

@Component({
	selector: 'button[chats]',
	imports: [UiAvatarComponent, DateConverterPipe],
	templateUrl: './ui-chats-button.component.html',
	styleUrl: './ui-chats-button.component.scss',
})
export class UiChatsButtonComponent {
	chat = input<LastMessageRes>();
}
