import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	lastMessageActions,
	LastMessageRes,
	selectLastMessage,
	selectLastMessages,
} from '@tt/data-access';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LastMessageEffects {
	actions$ = inject(Actions);
	store = inject(Store);

	storeChats = this.store.selectSignal(selectLastMessages);
	lastMessage = this.store.selectSignal(selectLastMessage);

	updateMessageList = createEffect(() => {
		return this.actions$.pipe(
			ofType(lastMessageActions.messageSend),
			map((val) => {
				const index = this.storeChats().findIndex(
					(item) => item.id === val.lastMessage.data.chat_id
				);

				let newArray:LastMessageRes[] = new Array()

				this.storeChats().forEach((item, i) => {
					if(i === index ) {
						let newItem:LastMessageRes = {
							id: item.id,
							userFrom: item.userFrom,
							unreadMessages: item.unreadMessages,
							message: val.lastMessage.data.message,
							createdAt: val.lastMessage.data.created_at
						}

						newArray.push(newItem)

					} else {
						newArray.push(item)
					}
				})

				return lastMessageActions.chatsLoaded({
					chats: newArray
				});
			})
		);
	});

	readMessage = createEffect(() => {
		return this.actions$.pipe(
			ofType(lastMessageActions.messageRead),
			map((val) => {
				const index = this.storeChats().findIndex(
					(item) => item.id === val.lastMessage.id
				);

				let newArray:LastMessageRes[] = new Array()

				this.storeChats().forEach((item, i) => {
					if(i === index ) {
						let newItem:LastMessageRes = {
							id: item.id,
							userFrom: item.userFrom,
							unreadMessages: 0,
							message: val.lastMessage.message,
							createdAt: val.lastMessage.createdAt
						}

						newArray.push(newItem)

					} else {
						newArray.push(item)
					}
				})

				return lastMessageActions.chatsLoaded({
					chats: newArray
				});
			})
		);
	});
}
