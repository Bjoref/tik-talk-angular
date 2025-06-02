import { Component, inject, input, signal } from '@angular/core';
import { UiChatsWorkspaceMessageComponent } from '../ui-chats-workspace-message/ui-chats-workspace-message.component';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { ChatHttpService } from '../../data/services/chat-http.service';
import { Chat, Message } from '../../data/interfaces/chat.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'ui-chats-workspace-messages-wrapper',
	imports: [UiChatsWorkspaceMessageComponent, UiPostInputComponent],
	templateUrl: './ui-chats-workspace-messages-wrapper.component.html',
	styleUrl: './ui-chats-workspace-messages-wrapper.component.scss',
})
export class UiChatsWorkspaceMessagesWrapperComponent {
	chat = input.required<Chat>();

	chatService = inject(ChatHttpService);

	messages = this.chatService.activeChatessages;

	async onSendMessage(text: string) {
		await firstValueFrom(this.chatService.sendMessage(this.chat().id, text));

	  await firstValueFrom(this.chatService.getChatById(this.chat().id));
	}
}
