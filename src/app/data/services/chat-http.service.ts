import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Chat, LastMessageRes, Message } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService extends HttpService {
	private directionMessage: string = `${this.baseApiUrl}message/`;
	private directionChat: string = `${this.baseApiUrl}chat/`;

	createChat(userId: number): Observable<Chat> {
		return this.http.post<Chat>(`${this.directionChat}${userId}`, {})
	}

	getMyChats(){
		return this.http.get<LastMessageRes[]>(`${this.directionChat}get_my_chats/`)
	}

	getChatById(chatId: number) {
		return this.http.get<Chat>(`${this.directionChat}${chatId}`)
	}

	sendMessage(chatId: number, message: string) {
		return this.http.post<Message>(`${this.directionMessage}${chatId}`, {}, {
			params: {
				message
			}
		})
	}

}
