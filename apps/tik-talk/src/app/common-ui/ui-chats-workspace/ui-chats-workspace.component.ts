import { Component, inject } from '@angular/core';
import { UiChatsWorkspaceHeaderComponent } from '../ui-chats-workspace-header/ui-chats-workspace-header.component';
import { UiChatsWorkspaceMessagesWrapperComponent } from '../ui-chats-workspace-messages-wrapper/ui-chats-workspace-messages-wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { ChatHttpService } from '../../data/services/chat-http.service';
import {
	firstValueFrom,
	switchMap,
	tap,
	timer,
	interval,
	Observable,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';

@Component({
	selector: 'ui-chats-workspace',
	imports: [
		UiChatsWorkspaceHeaderComponent,
		UiChatsWorkspaceMessagesWrapperComponent,
		CommonModule,
		UiPostInputComponent,
	],
	templateUrl: './ui-chats-workspace.component.html',
	styleUrl: './ui-chats-workspace.component.scss',
})
export class UiChatsWorkspaceComponent {
	route = inject(ActivatedRoute);
	chatService = inject(ChatHttpService);
	private id: number = 0;

	chatInterval = interval(5000);
	getChatsInterval = this.chatInterval.subscribe(() => {
		if (this.id) {
			firstValueFrom(this.chatService.getChatById(this.id));
		}
	});

	activeChat$ = this.route.params.pipe(
		switchMap(({ id }) => this.chatService.getChatById(id)),
		tap(({ id }) => (this.id = id))
	);

	async onSendMessage(text: string) {
		this.getChatsInterval.unsubscribe();
		await firstValueFrom(this.chatService.sendMessage(this.id, text));

		await firstValueFrom(this.chatService.getChatById(this.id));

		this.getChatsInterval = this.chatInterval.subscribe(() => {
			if (this.id) {
				firstValueFrom(this.chatService.getChatById(this.id));
			}
		});
	}
}
