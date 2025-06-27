import { finalize, Observable, tap } from 'rxjs';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { ChatConnectionWSParams, ChatWSService } from '../interfaces/chats-ws-service.interface';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'

export class ChatWSRxjsService implements ChatWSService {
	#socket: WebSocketSubject<ChatWSMessage> | null = null;

	connect(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
        if(!this.#socket) {
            this.#socket = webSocket({
                url: params.url,
                protocol: [params.token]
            })
        }; 


        return this.#socket.asObservable()
            .pipe(
                tap(message => params.handleMessage(message)),
                finalize(() => {
                    console.log('Сокет всё')
                })
            )
	}
	sendMessage(text: string, chatId: number) {
        this.#socket?.next({
            text,
            chat_id: chatId
        })

	}
	disconnect() {
        this.#socket?.complete()
	}
}
