import { Component, inject } from '@angular/core';
import { UiChatsButtonComponent } from '../ui-chats-button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { ChatHttpService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'ui-chats-list',
	imports: [
		UiChatsButtonComponent,
		CommonModule,
		RouterLink,
		RouterLinkActive,
		ReactiveFormsModule,
	],
	templateUrl: './ui-chats-list.component.html',
	styleUrl: './ui-chats-list.component.scss',
})
export class UiChatsListComponent {
	chatService = inject(ChatHttpService);

	filterChatsControl = new FormControl('');
	chats$ = this.chatService.getMyChats().pipe(
		switchMap((chats) => {
			return this.filterChatsControl.valueChanges.pipe(
				startWith(''),
				map((inputValue) => {
					return chats.filter((chat) => {
						return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
							.toLowerCase()
							.includes(inputValue!.toLowerCase());
					});
				})
			);
		})
	);
}
