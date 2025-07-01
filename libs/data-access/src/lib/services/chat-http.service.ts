import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ProfileHttpService } from './profile-http.service';
import { Chat, LastMessageRes, Message } from '../interfaces/chat.interface';
import { ChatWSService } from '../interfaces/chats-ws-service.interface';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import {
	isErrorMessage,
	isNewMessage,
	isUnreadMessage,
} from '../interfaces/type-guard';
import { ChatWSRxjsService } from './chat-ws-rxjs.service';
import { Store } from '@ngrx/store';
import { messageActions } from '../store/messageStore';
import { lastMessageActions, selectTokenInfo } from '../store';

@Injectable({
	providedIn: 'root',
})
export class ChatHttpService extends HttpService {
	store = inject(Store);

	private directionMessage: string = `${this.baseApiUrl}message/`;
	private directionChat: string = `${this.baseApiUrl}chat/`;
	private profileHttpService = inject(ProfileHttpService);
	private me = inject(ProfileHttpService).me;

	activeChatessages = signal<Message[]>([]);

	token = this.store.selectSignal(selectTokenInfo);

	wsAdapter: ChatWSService = new ChatWSRxjsService();

	connectWS() {
		return this.wsAdapter.connect({
			url: `${this.directionChat}ws`,
			token: this.token() ?? '',
			handleMessage: this.handleWSMessage,
		}) as Observable<ChatWSMessage>;
	}

	handleWSMessage = (message: ChatWSMessage) => {
		if (!isErrorMessage(message) && !('action' in message)) return;

		if (isErrorMessage(message)) {
			this.wsAdapter.disconnect();
			return;
		}

		if (isUnreadMessage(message)) {
			console.log(message);
			this.store.dispatch(
				messageActions.messageUnread({ count: message.data.count })
			);

			this.getMyChats();
		}

		if (isNewMessage(message)) {
			this.store.dispatch(
				lastMessageActions.messageSend({ lastMessage: message })
			);
			const prevMessage =
				this.activeChatessages()[this.activeChatessages().length - 1];
			const isDate = this.isSameDay(
				new Date(prevMessage.createdAt),
				new Date(message.data.created_at)
			)
				? false
				: true;
			this.activeChatessages.set([
				...this.activeChatessages(),
				{
					user: this.me()!,
					id: message.data.id,
					userFromId: message.data.author,
					personalChatId: message.data.chat_id,
					text: message.data.message,
					createdAt: message.data.created_at,
					isRead: false,
					isMine: true,
					isDate: isDate,
					updatedAt: message.data.updated_at || '',
				},
			]);
		}
	};

	private isSameDay(date1: Date, date2: Date): boolean {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	}

	createChat(userId: number): Observable<Chat> {
		return this.http.post<Chat>(`${this.directionChat}${userId}`, {});
	}

	getMyChats() {
		return this.http
			.get<LastMessageRes[]>(`${this.directionChat}get_my_chats/`)
			.pipe(
				map((res) => {
					res.sort(function (a, b) {
						if (a.createdAt < b.createdAt) return 1;
						if (a.createdAt > b.createdAt) return -1;
						return 0;
					});
					this.store.dispatch(
						lastMessageActions.chatsLoaded({
							chats: res,
						})
					);
					return res;
				})
			);
	}

	getChatById(chatId: number) {
		return this.http.get<Chat>(`${this.directionChat}${chatId}`).pipe(
			map((chat) => {
				this.filterToCreateDate(chat.messages);
				const patchedMessages = chat.messages.map((message, index) => {
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
				new Date(a[i].createdAt).setHours(0, 0, 0, 0) <
				new Date(a[i + 1].createdAt).setHours(0, 0, 0, 0)
			) {
				a[i + 1].isDate = true;
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

	async ngOnInit() {
		if (!this.me) {
			await firstValueFrom(this.profileHttpService.getMe());
		}
	}
}
