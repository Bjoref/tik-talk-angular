import { createFeature, createReducer, on } from '@ngrx/store';
import { lastMessageActions } from './actions';
import { LastMessageRes } from '../../interfaces/chat.interface';
import { ChatWSNewMessage } from '../../interfaces/chat-ws-message.interface';

export interface LastMessagesState {
	chats: LastMessageRes[];
	lastMessage: ChatWSNewMessage | null;
}

const initialState: LastMessagesState = {
	chats: [],
	lastMessage: null,
};

export const lastMessagesFeature = createFeature({
	name: 'lastMessagesFeature',
	reducer: createReducer(
		initialState,
		on(lastMessageActions.chatsLoaded, (state, payload) => {
			return {
				...state,
				chats: payload.chats,
			};
		}),
		on(lastMessageActions.messageSend, (state, payload) => {
			return {
				...state,
				lastMessage: payload.lastMessage,
			};
		})
	),
});
