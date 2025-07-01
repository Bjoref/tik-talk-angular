import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { UiChatsButtonComponent } from '../ui-chats-button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { findIndex, map, startWith, Subscription, switchMap, tap } from 'rxjs';
import {
	ChatHttpService,
	lastMessageActions,
	LastMessageRes,
	selectCount,
	selectLastMessage,
	selectLastMessages,
} from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	readMessage(chat: LastMessageRes) {
		this.store.dispatch(lastMessageActions.messageRead({ lastMessage: chat }));
	}

	filterChatsControl = new FormControl('');
}
