import { createFeature, createReducer, on } from '@ngrx/store';
import { lastMessageActions } from './actions';
import { LastMessageRes } from '../../interfaces/chat.interface';

export interface LastMessagesState {
	chats: LastMessageRes[];
}

const initialState: LastMessagesState = {
	chats: [],
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
	),
});
