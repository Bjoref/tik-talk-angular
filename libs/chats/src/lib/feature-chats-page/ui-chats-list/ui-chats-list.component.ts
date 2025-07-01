import { Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { UiChatsButtonComponent } from '../ui-chats-button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { findIndex, map, startWith, Subscription, switchMap, tap } from 'rxjs';
import {
	ChatHttpService,
	lastMessageActions,
	selectCount,
	selectLastMessage,
	selectLastMessages,
} from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

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
	store = inject(Store);

	count: Signal<number> = this.store.selectSignal(selectCount);
	storeChats = this.store.selectSignal(selectLastMessages);

	last = this.store.selectSignal(selectLastMessage);

	chatSub!: Subscription;

	private destroyRef = inject(DestroyRef);

	constructor() {
		effect(() => {
			if (this.count()) {
				if (this.chatSub) {
					this.chatSub.unsubscribe();
				}
				this.chatSub = this.getChats();
			}

			if (this.last()) {
				// if (this.last() !== null) {
				// 	console.log(this.last());
				// 	const elem = this.storeChats().find(
				// 		(item) => item.id === this.last()!.data.chat_id
				// 	);
				// 	const index = this.storeChats().findIndex(
				// 		(item) => item.id === this.last()!.data.chat_id
				// 	);

				// 	if (!elem) return;

				// 	elem.createdAt = this.last()!.data.created_at;
				// 	elem.message = this.last()!.data.message;

				// 	this.store.dispatch(
				// 		lastMessageActions.chatsLoaded({
				// 			chats: this.storeChats().splice(index, 1, elem),
				// 		})
				// 	);
				// }
			}
		});
	}

	ngOnInit() {
		this.chatSub = this.getChats();
	}

	getChats() {
		return this.chatService
			.getMyChats()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				switchMap((chats) => {
					return this.filterChatsControl.valueChanges.pipe(
						startWith(''),
						map((inputValue) => {
							this.store.dispatch(
								lastMessageActions.chatsLoaded({
									chats: chats.filter((chat) => {
										return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
											.toLowerCase()
											.includes(
												inputValue!.toLowerCase()
											);
									}),
								})
							);
						})
					);
				})
			)
			.subscribe();
	}

	filterChatsControl = new FormControl('');
}
