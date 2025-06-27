import { createFeature, createReducer, on } from '@ngrx/store';
import { messageActions } from './actions';

export interface MessageState {
	count: number;
}

const initialState: MessageState = {
	count: 0,
};

export const messageFeature = createFeature({
	name: 'messageFeature',
	reducer: createReducer(
		initialState,
		on(messageActions.messageUnread, (state, payload) => {
			return {
				...state,
				count: payload.count,
			};
		}),
	),
});
