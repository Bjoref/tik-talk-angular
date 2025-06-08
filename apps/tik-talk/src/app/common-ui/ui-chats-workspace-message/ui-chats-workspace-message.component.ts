import { Component, HostBinding, input } from '@angular/core';
import { Message } from '../../data/interfaces/chat.interface';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';
import { CommonModule } from '@angular/common';
import { DateConverterPipe } from '../../helpers/pipes/date-converter.pipe';

@Component({
	selector: 'ui-chats-workspace-message',
	imports: [UiAvatarComponent, CommonModule, DateConverterPipe],
	templateUrl: './ui-chats-workspace-message.component.html',
	styleUrl: './ui-chats-workspace-message.component.scss',
})
export class UiChatsWorkspaceMessageComponent {
	message = input.required<Message>();

	@HostBinding('class.is-mine')
	get isMine() {
		return this.message().isMine;
	}
}
