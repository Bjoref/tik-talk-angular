import { Component, inject } from '@angular/core';
import { UiChatsWorkspaceHeaderComponent } from '../ui-chats-workspace-header';
import { UiChatsWorkspaceMessagesWrapperComponent } from '../ui-chats-workspace-messages-wrapper';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, switchMap, tap, interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiPostInputComponent } from '@tt/common-ui';
import { ChatHttpService } from '@tt/data-access';

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

	chatInterval = interval(300000);
	getChatsInterval = this.chatInterval.subscribe(() => {
		if (this.id) {
			firstValueFrom(this.chatService.getChatById(this.id));
		}
	});

	activeChat$ = this.route.params.pipe(
		switchMap(({ id }) => this.chatService.getChatById(id)),
		tap(({ id }) => (this.id = id))
	);

	onSendMessage(text: string) {
		if (!text.length) return;
		this.chatService.wsAdapter.sendMessage(text, this.id);
		// this.getChatsInterval.unsubscribe();
		// await firstValueFrom(this.chatService.sendMessage(this.id, text));

		// await firstValueFrom(this.chatService.getChatById(this.id));

		// this.getChatsInterval = this.chatInterval.subscribe(() => {
		// 	if (this.id) {
		// 		firstValueFrom(this.chatService.getChatById(this.id));
		// 	}
		// });
	}
}
