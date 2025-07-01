import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	lastMessageActions,
	LastMessageRes,
	ProfileHttpService,
	selectLastMessages,
} from '@tt/data-access';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LastMessageEffects {
	actions$ = inject(Actions);
	store = inject(Store);

	storeChats = this.store.selectSignal(selectLastMessages);

	filterProfiles = createEffect(() => {
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
}
