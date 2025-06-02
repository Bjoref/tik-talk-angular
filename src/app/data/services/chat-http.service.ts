import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';
import { Chat, LastMessageRes, Message } from '../interfaces/chat.interface';
import { ProfileHttpService } from './profile-http.service';

@Injectable({
	providedIn: 'root',
})
export class ChatHttpService extends HttpService {
	private directionMessage: string = `${this.baseApiUrl}message/`;
	private directionChat: string = `${this.baseApiUrl}chat/`;
	private me = inject(ProfileHttpService).me;

	activeChatessages = signal<Message[]>([]);

	createChat(userId: number): Observable<Chat> {
		return this.http.post<Chat>(`${this.directionChat}${userId}`, {});
	}

	getMyChats() {
		return this.http.get<LastMessageRes[]>(
			`${this.directionChat}get_my_chats/`
		);
	}

	getChatById(chatId: number) {
		return this.http.get<Chat>(`${this.directionChat}${chatId}`).pipe(
			map((chat) => {
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
