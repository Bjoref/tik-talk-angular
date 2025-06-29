import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable, take, tap } from 'rxjs';
import { ProfileHttpService } from './profile-http.service';
import { Chat, LastMessageRes, Message } from '../interfaces/chat.interface';
import { AuthHttpService } from './auth-http.service';
import { ChatWSService } from '../interfaces/chats-ws-service.interface';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guard';
import { ChatWSRxjsService } from './chat-ws-rxjs.service';
import { Store } from '@ngrx/store';
import { messageActions } from '../store/messageStore';

@Injectable({
	providedIn: 'root',
})
export class ChatHttpService extends HttpService {
	store = inject(Store);

	private directionMessage: string = `${this.baseApiUrl}message/`;
	private directionChat: string = `${this.baseApiUrl}chat/`;
	private me = inject(ProfileHttpService).me;
	private authService = inject(AuthHttpService);

	activeChatessages = signal<Message[]>([]);

	wsApadter: ChatWSService = new ChatWSRxjsService();

	connectWS() {
		return this.wsApadter.connect({
			url: `${this.directionChat}ws`,
			token: this.authService.token ?? '',
			handleMessage: this.handleWSMessage,
		}) as Observable<ChatWSMessage>;
	}

	handleWSMessage = (message: ChatWSMessage) => {
		if (!('action' in message)) return;

		if (isUnreadMessage(message)) {
			this.store.dispatch(
				messageActions.messageUnread({ count: message.data.count })
			);
		}

		if (isNewMessage(message)) {
			this.activeChatessages.set([
				...this.activeChatessages(),
				{
					id: message.data.id,
					userFromId: message.data.author,
					personalChatId: message.data.chat_id,
					text: message.data.message,
					createdAt: message.data.created_at,
					isRead: false,
					isMine: true,
					updatedAt: message.data.updated_at || '',
				},
			]);
		}
	};

	createChat(userId: number): Observable<Chat> {
		return this.http.post<Chat>(`${this.directionChat}${userId}`, {});
	}

	getMyChats() {
		return this.http
			.get<LastMessageRes[]>(`${this.directionChat}get_my_chats/`)
			.pipe(
				map((res) => {
					console.log(res);
					console.log(
						res.sort(function (a, b) {
							if (a.id < b.id) return 1;
							if (a.id > b.id) return -1;
							return 0;
						})
					);
					return res.sort(function (a, b) {
						if (a.createdAt < b.createdAt) return 1;
						if (a.createdAt > b.createdAt) return -1;
						return 0;
					});
				})
			);
	}

	getChatById(chatId: number) {
		return this.http.get<Chat>(`${this.directionChat}${chatId}`).pipe(
			map((chat) => {
				this.filterToCreateDate(chat.messages);
				const patchedMessages = chat.messages.map((message) => {
					return {
						...message,
						user:
							chat.userFirst.id === message.userFromId
								? chat.userFirst
								: chat.userSecond,
						isMine: message.userFromId === this.me()!.id,
					};
				});
				this.activeChatessages.set(patchedMessages);
				return {
					...chat,
					companion:
						chat.userFirst.id === this.me()?.id
							? chat.userSecond
							: chat.userFirst,
					messages: patchedMessages,
				};
			})
		);
	}

	filterToCreateDate(a: Message[]) {
		for (let i = 0; i < a.length - 1; i++) {
			if (i === 0) {
				a[i].isDate = true;
				a[i].isFirstMessage = true;
			}
			if (
				new Date(a[i].createdAt).getDay() <
				new Date(a[i + 1].createdAt).getDay()
			) {
				a[i].isDate = true;
			}
		}
	}

	sendMessage(chatId: number, message: string) {
		return this.http.post<Message>(
			`${this.directionMessage}send/${chatId}`,
			{},
			{
				params: {
					message,
				},
			}
		);
	}
}
